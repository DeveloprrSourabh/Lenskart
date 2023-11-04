import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import useCategory from "../../hooks/useCategory";
import { useNavigate, useParams } from "react-router-dom";

const host = "http://localhost:8080";

const UpdateProduct = () => {
  const categories = useCategory();
  const params = useParams();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    category: "",
  });
  const [photo, setPhoto] = useState("");

  const onChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Get Single Product
  const getSingleProduct = async () => {
    const res = await fetch(
      `${host}/api/v1/product/get-product/${params.slug}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    if (data.success) {
      setProduct(data.product);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, [params.slug]);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", product.name);
      productData.append("description", product.description);
      productData.append("quantity", product.quantity);
      productData.append("price", product.price);
      productData.append("category", product.category._id);
      photo && productData.append("photo", photo);

      const { data } = await axios.put(
        `${host}/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/create-product");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${host}/api/v1/product/delete-product/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: auth?.token,
        },
      });
      navigate("/dashboard/admin/products");
      const data = res.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.success("Something Went Wrong");
    }
  };

  window.onload = function () {
    // similar behavior as clicking on a link
    window.location.href = "/dashboard/admin/products";
  };
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="row no-padding my-account-wrapper">
          <AdminMenu />
          <div className="col-sm-6 no-padding">
            <div className="update-profile">
              <h1 className="edit-heading">Products</h1>
              <h2 className="edit-subheading">Update Product</h2>
              <div className="edit-profile">
                <div className="row">
                  <div className="col-sm-12 product-img text-center p-3">
                    <label>
                      {photo ? (
                        <div className="img mb-3">
                          <img
                            className="w-100 h-100"
                            src={URL.createObjectURL(photo)}
                            alt="product_photo"
                          />
                        </div>
                      ) : (
                        <div className="img mb-3">
                          <img
                            className="w-100 h-100"
                            src={`${host}/api/v1/product/product-photo/${product._id}`}
                            alt="product_photo"
                          />
                        </div>
                      )}
                      <div className="create-product-name my-3">
                        {photo ? (
                          photo?.name.substring(0, 20) + "..."
                        ) : (
                          <div className="product_photo-select">
                            Upload Photo
                          </div>
                        )}
                      </div>
                      <input
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
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
                  <div className="col-sm-6 edit-input">
                    <label>Product Category*</label>
                    {console.log(product)}
                    <select
                      value={product.category._id}
                      onChange={onChange}
                      name="category"
                    >
                      <option value={"65450882d722235a28fsssss"}>
                        Choose Category
                      </option>
                      {categories?.map((c) => (
                        <option value={c?._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="d-flex gap-5 edit-btn col-sm-12">
                  <button
                    onClick={(e) => {
                      handleSubmit(e, product._id);
                    }}
                    className="edit-form-btn"
                  >
                    <b>Update Product</b>
                  </button>
                  <div
                    onClick={() => {
                      handleDelete(product._id);
                    }}
                    className="edit-form-btn text-center"
                  >
                    <b>Delete Product</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
