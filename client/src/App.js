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
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import Products from "./Pages/Admin/Products";
import Shop from "./Pages/Shop";
import SingleShop from "./Pages/SingleShop";
import CartPage from "./Pages/CartPage";
import SearchPage from "./Pages/SearchPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<SingleShop />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/search" element={<SearchPage />} />
        <Route path="/product-search/:keyword" element={<SearchPage />} />
        {/* Admin Routes */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/profile" element={<Profile />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/edit-product/:slug" element={<UpdateProduct />} />
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
