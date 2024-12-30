import InfiniteScroll from "./components/InfiniteScroll";
import { fetchProducts } from "./actions";

export default async function Home() {

  const { formatedProducts } = await fetchProducts({});
  //console.log(products);

  return (
    <div className="container mx-auto pt-0 sm:pt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <InfiniteScroll initialProducts={formatedProducts} />
      </div>
    </div>
  );
}
