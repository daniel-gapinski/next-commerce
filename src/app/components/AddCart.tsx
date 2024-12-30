'use client';

import { useCartStore } from "@/store";
import { ProductType } from "@/lib/types/ProductType";

export default function AddCart({ product }: { product: ProductType }) {

    const { addProduct } = useCartStore();


    return (
        <button
            onClick={() => addProduct(product) }
            className="border rounded-md bg-teal-600 text-white p-2 text-sm text-center">Adicionar ao Carrinho</button>
    )
}