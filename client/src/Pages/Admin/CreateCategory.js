import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";

const host = "http://localhost:8080";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useAuth();
  const [category, setCategory] = useState({
    name: "",
    email: "",
  });
  const onChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${host}/api/v1/category/create-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
        body: JSON.stringify(category),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        getAllcategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Get All Categories
  const getAllcategory = async (req, res) => {
    try {
      const res = await fetch(`${host}/api/v1/category/get-category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllcategory();
  }, []);

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="row no-padding my-account-wrapper">
          <AdminMenu />
          <div className="col-sm-4 no-padding">
            <div className="update-profile">
              <h1 className="edit-heading">Categories</h1>
              <h2 className="edit-subheading">Create Category</h2>
              <form className="edit-profile" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-6 edit-input">
                    <label>Category Name*</label>
                    <input
                      onChange={onChange}
                      name="name"
                      type="text"
                      value={category.name}
                    />
                  </div>
                </div>
                <div className="edit-btn col-sm-12">
                  <button className="edit-form-btn">Create Category</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="all-categories" id="myScroll">
              {categories.map((c) => (
                <div className="categogy-card d-flex my-3 justify-content-between">
                  <div className="cat-name">
                    <h2>{c.name}</h2>

                    <p className="cat-time">Created By : {auth?.user?.name}</p>
                    <p className="cat-time">
                      Created At : {new Date(c.createdAt).toDateString()}
                    </p>
                  </div>

                  <div className="cat-option">
                    <span className="del-cat mx-2">
                      <i class="fa-solid fa-trash"></i>
                    </span>
                    <span className="edit-cat mx-2">
                      <i class="fa-solid fa-pen-to-square"></i>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
