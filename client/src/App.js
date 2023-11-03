import "./App.css";
import AdminRoute from "./Components/Routes/AdminRoute";
import Private from "./Components/Routes/Private";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import UserDashboard from "./Pages/User/UserDashboard";
import Profile from "./Pages/Admin/Profile";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Products from "./Pages/Admin/Products";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Admin Routes */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/profile" element={<Profile />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
        </Route>
        {/* User Routes */}
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="profile" element={<UserDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
