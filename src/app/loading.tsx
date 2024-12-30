import SkeletonCard from "./components/SkeletonCard"

export default function Product() {
    return (
         <div className="container mx-auto pt-0 sm:pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                <SkeletonCard isLoading/>
                <SkeletonCard isLoading/>
                <SkeletonCard isLoading/>
              </div>
            </div>
    )
}