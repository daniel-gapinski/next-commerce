import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


type CheckoutButtonProps = {
    totalPrice: number,
};

export default function CheckoutButton({ totalPrice }: CheckoutButtonProps ) {
    const router = useRouter();
    const { user } = useUser();
    const cartStore = useCartStore();

    const handleCheckout = async () => {
        if(!user) {
            cartStore.toggleCart();
            router.push(`/sign-in?redirectUrl`);
            return;
        }
        cartStore.setCheckout('checkout')
    }

    return (
        <div>
            <p className="text-teal-400 font-bold">Total: {formatPrice(totalPrice)}</p>
            <button onClick={handleCheckout} className="mt-3 w-full rounded-md py-3 text-white bg-teal-600 hover:bg-teal-700">Finalizar compra</button>
        </div>
    )
}