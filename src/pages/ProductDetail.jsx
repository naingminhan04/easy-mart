import ProductDetail from "../components/ProductDetail";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getCart, setCart } from "../utils/cart";
import { useQuery } from "@tanstack/react-query";

async function fetchDetail(productId) {
  const res = await fetch(
    `https://fakeapi.in/api/ecommerce/products/${productId}`
  );
  return res.json();
}

export default function ProductPage() {
  const { productId } = useParams();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchDetail(productId),
  });

  if (isLoading) return <div className="flex justify-center items-center min-h-[60vh] text-lg font-semibold">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-[60vh] text-red-600 font-semibold">{error.message}</div>;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    const cart = getCart(user);
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.tags?.includes("Sale") ? product.finalPrice : product.price,
        qty: 1
      });
    }
    setCart(user, cart);
    // Optionally show a toast/notification
  };

  const handleBuy = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    // Add to cart and go to cart page
    handleAddToCart();
    navigate(`/carts/${user ? user.email || user.sub : "guest"}`);
  };

  return (
    <div>
      <div className="min-h-dvh flex flex-col md:justify-center pt-16 md:pt-20 bg-gray-50">
        <div className="scrollbar-none md:flex md:mx-auto items-center bg-white xl:max-w-5xl rounded-lg shadow-md">
          <ProductDetail />
        </div>
        <div className="md:flex md:mx-auto items-center bg-white xl:max-w-5xl">
          {/* Optionally add more details here */}
        </div>
      </div>
      <div className="sticky bottom-0 md:static flex w-full items-center border-t border-gray-200 bg-white">
        <button
          onClick={handleBuy}
          className="w-1/2 bg-black text-white p-4 text-center font-semibold hover:bg-gray-900 transition"
        >
          Buy
        </button>
        <button
          onClick={handleAddToCart}
          className="w-1/2 bg-gray-200 p-4 text-black border-l border-gray-300 text-center font-semibold hover:bg-gray-300 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
