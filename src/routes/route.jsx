import { Routes, Route, useLocation } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import ProductModal from "../components/ProductModal";
import ProductDetail from "../pages/ProductDetail";
import SearchResult from "../pages/SearchResult";
import ProtectedRoute from "../components/ProtectedRoute";
import Auth from "../pages/Auth";

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

          <Route path="profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="auth" element={<Auth/>}/>

          <Route path="cart/:userId" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />

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
