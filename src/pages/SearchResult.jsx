import { useQuery } from "@tanstack/react-query";
import Product, { DummyProduct } from "../components/Product";
import Pagination from "../components/Pagination";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { SearchX, Home, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";

async function fetchProducts(query, page) {
  const res = await fetch(
    `https://fakeapi.in/api/ecommerce/products?search=${query}&page=${page}&limit=12`
  );
  return res.json();
}

export default function SearchResult() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(1);
  const prevQueryRef = useRef(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", query, page],
    queryFn: () => fetchProducts(query, page),
  });

  useEffect(() => {
    if (data?.pagination?.totalPages) {
      setTotalPages(data.pagination.totalPages);
    }
  }, [data]);

  useEffect(() => {
    prevQueryRef.current = query;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [query]);

  const showSearchingLoader =
    (isLoading && prevQueryRef.current === null) ||
    prevQueryRef.current !== query;

  if (showSearchingLoader) {
    return (
      <div className="h-dvh flex justify-center items-center">
        <Search className="size-10 animate-bounce sm:size-15 md:size-20 lg:size-25 lg:animate-ping" />
      </div>
    );
  }

  if (data?.data.products.length === 0) {
    return (
      <div className="h-lvh flex justify-center items-center">
        <div className="mx-2 p-2 text-center">
          <SearchX className="w-20 h-20 mx-auto sm:w-25 sm:h-25 md:w-30 md:h-30" />
          <div className="font-bold p-2 text-lg sm:text-xl md:text-2xl">
            We are sorry.
          </div>
          <div className="text-sm sm:text-base md:text-lg">
            We couldn't find any products that matches your search.
          </div>
          <button
            className="cursor-pointer m-2 p-1 rounded-lg bg-gray-500 border-2 text-gray-50 border-black text-sm sm:text-base md:text-lg hover:bg-black"
            onClick={() => navigate("/")}
          >
            Go Back?
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="h-lvh">{error.message}</div>;
  }

  return (
    <div className="min-h-dvh pt-15 md:pt-20 bg-gray-50">
      <div className="text-sm w-dvw mx-auto mt-3 sm:text-base md:text-lg lg:w-248 lg:text-xl">
        <div className="wrap-break-word flex justify-between items-center m-1 border-black border-2 rounded-3xl overflow-hidden">
          <div className="p-2">
            Search Results for "<b>{query}</b>"
          </div>
          <Link
            to={"/"}
            className="p-2 bg-gray-300 hover:bg-black hover:text-white"
            title="Home"
          >
            <Home className="sm:size-7 lg:size-8" />
          </Link>
        </div>
      </div>

      <Pagination
        page={page}
        setSearchParams={setSearchParams}
        totalPages={totalPages}
      />

      <div className="flex justify-center">
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
            data.data.products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </div>
      </div>

      <Pagination
        page={page}
        setSearchParams={setSearchParams}
        totalPages={totalPages}
      />
    </div>
  );
}
