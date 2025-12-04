import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProductDetail from "./ProductDetail";
import { getCart, setCart } from "../utils/cart";

export default function ProductModal() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const location = useLocation();
  const { product } = location.state;

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

  function handleBuy() {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    if (!product) {
      console.error("Product unavailable in modal.");
      return;
    }

    const cart = getCart(user);
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        img: product.images[0],
        price: product.tags.includes("Sale")
          ? product.finalPrice
          : product.price,
        qty: 1,
      });
    }

    setCart(user, cart);
    navigate(`/cart/${user.sub}`);
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
            <button
              onClick={handleBuy}
              className="w-1/2 bg-black text-white p-3 text-center sm:p-4"
            >
              Buy
            </button>

            <button
              onClick={close}
              className="w-1/2 bg-gray-300 p-3 text-black border-white text-center sm:p-4"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
