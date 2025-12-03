import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Product from "../components/Product";
import { DummyProduct } from "../components/Product";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";

async function fetchProducts(page) {
  const res = await fetch(
    `https://fakeapi.in/api/ecommerce/products?page=${page}`
  );
  return res.json();
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (products?.pagination?.totalPages) {
      setTotalPages(products.pagination.totalPages);
    }
  }, [products]);

  if (error) {
    return (
      <div className="h-lvh flex justify-center items-center">
        {error.message}
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-15 md:pt-20 bg-gray-50 min-h-dvh">
      <div>
        <Pagination
          page={page}
          setSearchParams={setSearchParams}
          totalPages={totalPages}
        />
        <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 p-1">
          {isLoading && (
            <>
              {Array.from({ length: 12 }, (_, i) => (
                <DummyProduct key={i} />
              ))}
            </>
          )}
          {!isLoading &&
            !error &&
            products.data.products.map((product) => {
              return <Product key={product.id} product={product} />;
            })}
        </div>
        <Pagination
          page={page}
          setSearchParams={setSearchParams}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
