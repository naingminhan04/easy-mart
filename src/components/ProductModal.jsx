import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import ProductDetail from "./ProductDetail";

export default function ProductModal({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  function close() {
    navigate(-1);
  }

  return (
    <div
      className="fixed z-20 inset-0 bg-black/40 flex justify-center items-center"
      onClick={close}
    >
      <div
        className="bg-gray-200 justify-center flex items-center w-[80vw] max-h-[80vh] md:max-h-[65vh] xl:max-w-250"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center w-full h-full">
          <div className="border-gray-300 border-2 overflow-y-scroll scrollbar-none max-w-[80vw] max-h-[80vh] md:flex md:max-h-[65vh] bg-white xl:max-w-250">
            <ProductDetail />
          </div>
          <div className="sticky bottom-0 flex w-full items-center">
            <Link
              to={`/carts/${user}`}
              className="w-1/2 bg-black text-white p-3 text-center sm:p-4"
            >
              Buy
            </Link>
            <Link
              onClick={close}
              className="w-1/2 bg-gray-300 p-3 text-black border-white text-center sm:p-4"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
