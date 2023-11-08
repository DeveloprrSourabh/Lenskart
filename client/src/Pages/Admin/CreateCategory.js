import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";

const host = "http://localhost:8080";

const CreateCategory = () => {
  const [editForm, setEditForm] = useState("");
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useAuth();
  const [category, setCategory] = useState({
    name: "",
    email: "",
  });
  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  const onChangeNew = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };
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

  //   Delete Category
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${host}/api/v1/category/delete-category/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        getAllcategory();
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  //   Update Category
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const res = await fetch(`${host}/api/v1/category/update-category/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
        body: JSON.stringify(newCategory),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        console.log(newCategory);
        getAllcategory();
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
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
            <div className="all-categories scroller" id="myScroll">
              {categories.map((c) => {
                return (
                  <>
                    <div
                      id="main-category-card"
                      key={c._id}
                      className={`categogy-card d-flex mb-3 me-3 justify-content-between ${
                        editForm && editForm === c.name ? "active" : ""
                      }`}
                    >
                      <div className="cat-name">
                        <h2>{c.name.substring(0, 20)}...</h2>
                        <p className="cat-time">
                          Created By : {auth?.user?.name}
                        </p>
                        <p className="cat-time">
                          Created At : {new Date(c.createdAt).toDateString()}
                        </p>
                      </div>

                      <div className="cat-option">
                        <span
                          className="del-cat mx-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </span>
                        <span
                          onClick={() => {
                            setEditForm(c.name);
                            setNewCategory({
                              name: "",
                            });
                          }}
                          className="edit-cat mx-2"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </span>
                      </div>
                    </div>
                    <div class="categogy-card mb-3 me-3">
                      <form
                        onSubmit={(e) => {
                          handleUpdate(e, c._id);
                        }}
                        className="d-flex align-items-center  justify-content-between align-align-items-center"
                      >
                        <div class="cat-name ">
                          <div class="edit-input">
                            <input
                              onChange={onChangeNew}
                              name="name"
                              type="text"
                              value={newCategory.name}
                            />
                          </div>
                        </div>
                        <div className="update-category">
                          <button class="cat-update-btn w mt-1">Update</button>
                        </div>
                      </form>
                      <p className="cat-time mt-0">
                        Created By : {auth?.user?.name}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
