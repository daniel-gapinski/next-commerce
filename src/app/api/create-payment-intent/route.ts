import { stripe } from "@/lib/stripe";
import { ProductType } from "@/lib/types/ProductType";
import { auth } from '@clerk/nextjs/server';
import prisma from "@/lib/prisma";

const calculateOrderAmount = (items: ProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        return acc + item.price! * item.quantity!;
    }, 0);

    return totalPrice;
}

export async function POST(req: Request) {
    const { userId, getToken } = await auth();
    const { items, payment_intent_id } = await req.json();

    //console.log('userId', userId);
    if(!userId) {
        return new Response("Unauthorized", { status: 401 })
    };

    const customerIdTep = 'cus_RUipNHRQvpYbpK';
    const total = calculateOrderAmount(items);

    const orderData = {
        user: { connect: { id: 1 }},
        amount: total,
        currency: 'brl',
        status: 'pending',
        paymentIntentID: payment_intent_id,
        products: {
            create: items.map((item: ProductType) => ({
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
            }))
        }
    }
    if(payment_intent_id) {
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

        if(current_intent) {
            const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
                amount: total,
            });
            const [existing_order, updated_order] =  await Promise.all([
                prisma.order.findFirst({
                    where: { paymentIntentID: payment_intent_id },
                    include: { products: true },
                }),
                prisma.order.update({
                    where: { paymentIntentID: payment_intent_id },
                    data: {
                        amount: total,
                        products: {
                            create: items.map((item: ProductType) => ({
                                name: item.name,
                                description: item.description,
                                quantity: item.quantity,
                                price: item.price,
                                image: item.image,
                            }))
                        }
                    },
                })
            ]);
            if(!existing_order) {
                return new Response("Order not found", { status: 404});
            }
            return Response.json({ paymentIntent: updated_intent }, {status: 200})
        };

    }else {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: 'brl',
            automatic_payment_methods: { enabled: true },
        });

        orderData.paymentIntentID = paymentIntent.id;

        const newOrder = await prisma.order.create({
            data: orderData,
        })

        return Response.json({ paymentIntent }, { status: 200 })
    }

    //console.log("items", items)
    //console.log("payment_intent_id", payment_intent_id)
}