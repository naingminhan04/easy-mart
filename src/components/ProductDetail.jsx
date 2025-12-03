import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Star } from "lucide-react";
import Image from "./ImageCarousel";

async function fetchDetail(productId) {
  const res = await fetch(
    `https://fakeapi.in/api/ecommerce/products/${productId}`
  );
  return res.json();
}

export default function ProductDetail() {
      const { productId } = useParams();
      const [index, setIndex] = useState(0);

      const {
        data: product,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => fetchDetail(productId),
      });
    
      if (isLoading) {
        return (
          <div className="h-lvh flex justify-center items-center">Loading...</div>
        );
      }
    
      if (error) {
        return (
          <div className="h-lvh flex justify-center items-center">
            {error.message}
          </div>
        );
      }
    return (
        <>
            <Image
              images={product.images}
              alt={product.name}
              index={index}
              setIndex={setIndex}
            />
            {product.images.length > 1 && (
              <div className="flex w-9/10 mx-auto rounded-lg mt-1 md:w-14 max-h-70 scrollbar-none overflow-scroll md:my-5 md:justify-center">
                <div className="mx-auto flex md:flex-col justify-center gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`w-14 md:w-full aspect-square rounded-md border shrink-0 overflow-hidden transition
                ${
                  i === index
                    ? "border-black shadow-lg"
                    : "border-gray-300 opacity-70"
                }`}
                    >
                      <img
                        src={img}
                        className="object-cover w-full h-full"
                        alt={`${i+1}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-3 md:w-3/5 lg:w-4/6 md:p-6 flex flex-col gap-1">
              {product.tags?.includes("Sale") ? (
                <div className="flex gap-2 items-center">
                  <span className="text-green-600 sm:text-lg font-semibold">
                    ${product.finalPrice}
                  </span>
                  <span className="line-through text-sm sm:text-base text-gray-500">
                    ${product.price}
                  </span>
                  <span className="rounded-2xl bg-green-400 text-xs sm:text-sm font-semibold text-white p-0.5">
                    -{product.discountPercent}%
                  </span>
                </div>
              ) : (
                <div className="text-green-600 sm:text-lg font-semibold">
                  ${product.price}
                </div>
              )}
              <div className="font-semibold text-lg sm:text-xl xl:text-2xl">
                {product.name}
              </div>
              <div className="flex text-yellow-500 items-center sm:text-lg font-medium">
                <Star size={20} /> {product.rating}
              </div>
              <div className="my-2 text-sm sm:text-base rounded">
                {product.description}
              </div>

              <div className="flex flex-wrap gap-2">
                {product.tags?.map((tag, index) => {
                  const tagColors = {
                    New: "bg-yellow-400",
                    Hot: "bg-red-400",
                    Sale: "bg-green-400",
                    Trending: "bg-blue-400",
                  };
                  return (
                    <div
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm sm:text-base font-medium text-white ${
                        tagColors[tag] || "bg-gray-300"
                      }`}
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-2 my-2">
                {product.variants.map((vari) => (
                  <div
                    key={vari.sku}
                    className="flex justify-between border rounded-xl p-2 bg-gray-50 sm:text-lg"
                  >
                    <div className="font-medium">Size: {vari.size}</div>
                    <div className="font-medium">Color: {vari.color}</div>
                  </div>
                ))}
              </div>
            </div>
        </>
    )
}