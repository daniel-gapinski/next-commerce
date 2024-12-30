import { ProductType } from "@/lib/types/ProductType";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/lib/utils";
import AddCart from "./AddCart";
import Link from "next/link";

type ProductProps = {
    product: ProductType
}

export default function Product({ product }: ProductProps) {
    return (

        <div className="flex flex-col shadow-lg bg-slate-800 p-5 text-gray-500">
            <Link href={`/product/${product.id}`}>
                <div className="relative h-72 w-full">
                    <ProductImage product={product} fill />
                </div>
                <div className="flex my-3 justify-between">
                    <p className="w-40 truncate">{product.name}</p>
                    <p className="text-md text-teal-300">{formatPrice(product.price)}</p>
                </div>
            </Link>
            <AddCart product={product} />
        </div>


    )
}