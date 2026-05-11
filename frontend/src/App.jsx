import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Customize from "./pages/Customize.jsx";
import Cart from "./pages/Cart.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/customize" element={<Customize />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
