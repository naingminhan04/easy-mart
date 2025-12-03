import { Routes, Route, useLocation } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Auth";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import OrderStatus from "../pages/OrderStatus";
import ProductModal from "../components/ProductModal";
import ProductDetail from "../pages/ProductDetail";
import SearchResult from "../pages/SearchResult";
import ProtectedRoute from "../components/ProtectedRoute";

export const AppRoutes = () => {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="products/:productId" element={<ProductDetail/>}/>
          <Route path="search" element={<SearchResult/>}/>

          <Route path="users" element={<Login/>} />

          <Route path="profile" element={<Profile/>} />

          <Route path="carts/:userId" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />

          <Route path="orders/:userId" element={<OrderStatus />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="products/:productId" element={<ProductModal />} />
        </Routes>
      )}
    </>
  );
};
