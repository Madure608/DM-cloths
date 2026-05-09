import { Route, Routes } from "react-router-dom";
import AdminDashboardPage from "../pages/AdminDashboardPage.jsx";
import AdminLoginPage from "../pages/AdminLoginPage.jsx";
import CartPage from "../pages/CartPage.jsx";
import CustomizePage from "../pages/CustomizePage.jsx";
import HomePage from "../pages/HomePage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/customize" element={<CustomizePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
