import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";

const host = "http://localhost:8080";

const UpdateProduct = () => {
  const [auth, setAuth] = useAuth();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
  });

  const onChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const res = await fetch(`${host}/api/v1/product/update-product/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="row no-padding my-account-wrapper">
          <AdminMenu />
          <div className="col-sm-6 no-padding">
            <div className="update-profile">
              <h1 className="edit-heading">Products</h1>
              <h2 className="edit-subheading">Create Product</h2>
              <form className="edit-profile" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-6 edit-input">
                    <label>Product Name*</label>
                    <input
                      onChange={onChange}
                      name="name"
                      type="text"
                      value={product.name}
                    />
                  </div>
                  <div className="col-sm-6 edit-input">
                    <label>Product Description*</label>
                    <input
                      onChange={onChange}
                      name="description"
                      type="text"
                      value={product.description}
                    />
                  </div>
                  <div className="col-sm-6 edit-input">
                    <label>Product Price*</label>
                    <input
                      onChange={onChange}
                      name="price"
                      type="number"
                      value={product.price}
                    />
                  </div>
                  <div className="col-sm-6 edit-input">
                    <label>Product Quantity*</label>
                    <input
                      onChange={onChange}
                      name="quantity"
                      type="number"
                      value={product.quantity}
                    />
                  </div>
                </div>
                <div className="edit-btn col-sm-12">
                  <button className="edit-form-btn">Create Product</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
