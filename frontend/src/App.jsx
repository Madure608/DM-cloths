import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Customize from "./pages/Customize.jsx";
import Cart from "./pages/Cart.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminSignup from "./pages/admin/AdminSignup.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/customize" element={<Customize />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/login" element={<UserLogin />} />
    <Route path="/signup" element={<UserSignup />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/signup" element={<AdminSignup />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
