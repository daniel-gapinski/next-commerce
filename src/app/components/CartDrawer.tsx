'use client'

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import Image from "next/image";
import CheckoutButton from "./CheckoutButton";
import Checkout from "./Checkout";

export default function CartDrawer() {

    const useStore = useCartStore();

    const totalPrice = useStore.cart.reduce((acc, item) => {
        return acc + item.price! * item.quantity!;
    }, 0)

    return (
        <div onClick={() => useStore.toggleCart()} className="fixed w-full h-screen bg-black/25 left-0 top-0 z-50">
            <div onClick={(e) => e.stopPropagation()} className="absolute bg-slate-600 right-0 top-0 w-1/3 h-screen p-12 overflow-y-auto">
                <button onClick={() => useStore.toggleCart()} className="font-semibold text-sm text-teal-600 ">Voltar para a loja</button>
                <div className="border-t border-gray-600 my-4 w-full"></div>

                {useStore.onCheckout === 'cart' && (
                    <>
                        {useStore.cart.map((item) => (
                            <div key={item.id} className="flex gap-4 py-4">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                    className="object-cover"
                                />
                                <div>
                                    <h2 className="w-42 truncate">{item.name}</h2>
                                    <h2>Quantidade: {item.quantity}</h2>
                                    <p className="text-teal-300 text-sm font-bold">{formatPrice(item.price)}</p>
                                    <div className="flex gap-4 mt-2">
                                        <button onClick={() => useStore.addProduct(item)} className="text-sm">Adicionar</button>
                                        <button onClick={() => useStore.removeProduct(item)} className="text-sm">Remover</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
                {useStore.cart.length > 0 && useStore.onCheckout === 'cart' && (
                    <CheckoutButton totalPrice={totalPrice} />
                )}
                {useStore.onCheckout === 'checkout' && (
                    <Checkout />
                )}

            </div>
        </div>
    )
}