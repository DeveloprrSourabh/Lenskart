import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import useCategory from "../../hooks/useCategory";

const host = "http://localhost:8080";

const CreateProduct = () => {
  const categories = useCategory();
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

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", product.name);
      productData.append("description", product.description);
      productData.append("quantity", product.quantity);
      productData.append("price", product.price);
      productData.append("category", product.category);
      photo && productData.append("photo", photo);

      const { data } = await axios.post(
        `${host}/api/v1/product/create-product`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      // const data = await res.json();
      if (!data?.success) {
        toast.error(data.message);
      } else {
        toast.success(data?.message);
        setProduct({
          name: "",
          description: "",
          quantity: "",
          price: "",
        });
        setPhoto("");
      }
    } catch (error) {
      return toast.error(error.response.data.message);
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
              <div className="edit-profile">
                <div className="row">
                  <div className="col-sm-12 product-img text-center p-3">
                    <label>
                      {photo && (
                        <div className="img mb-3">
                          <img
                            className="w-100 h-100"
                            src={URL.createObjectURL(photo)}
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
                    <select onChange={onChange} name="category">
                      <option value={"65450882d722235a28fsssss"}>
                        Choose Category
                      </option>
                      {categories?.map((c) => (
                        <option value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6 edit-input">
                    <label>Product Shipping*</label>
                    <select onChange={onChange} name="shipping">
                      <option>Shipping</option>
                      <option value={0}>No</option>
                      <option value={1}>Yes</option>
                    </select>
                  </div>
                </div>
                <div className="edit-btn col-sm-12">
                  <button onClick={handleClick} className="edit-form-btn">
                    Create Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
