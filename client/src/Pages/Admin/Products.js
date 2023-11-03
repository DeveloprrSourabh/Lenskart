import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/AdminMenu";
import Layout from "../../Components/Layout";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const host = "http://localhost:8080";
const Products = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  // Get All Products
  const getAllProducts = async () => {
    try {
      const res = await fetch(`${host}/api/v1/product/get-products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        console.log("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="row no-padding my-account-wrapper">
          <AdminMenu />
          <div className="col-sm-9 no-padding">
            <div className="update-profile">
              <h1 className="edit-heading">Products</h1>
              <h2 className="edit-subheading">All Products</h2>
              <div className="all-products row">
                {products &&
                  products.map((p) => {
                    return (
                      <div key={p._id} className=" col-sm-4 p-0">
                        <Link className="d-block  main-product">
                          <div className="product-img">
                            <img
                              className="w-100"
                              src="/Images/lens.jpg"
                              alt=""
                            />
                          </div>
                          <div className="product-details">
                            <div className="stars d-flex gap-1">
                              <span className="star">
                                4.6 <i class="fa-solid fa-star"></i>
                              </span>
                              <span className="review">26</span>
                            </div>
                            <div className="company pt-3 pb-2">
                              {auth?.user?.name.substring(0, 20)}
                            </div>
                            <div className="quantity py-1">
                              Quantity: {p.quantity}
                            </div>
                            <div className="price">₹ {p.price}</div>
                          </div>
                          <div className="last-item">
                            Get For ₹700. Coupon: EYECON
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
