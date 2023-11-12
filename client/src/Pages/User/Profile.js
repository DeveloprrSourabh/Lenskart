import React, { useState } from "react";
import Layout from "../../Components/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../Components/UserMenu";

const host = "http://localhost:8080";

const UserProfile = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: auth?.user?.name,
    email: auth?.user?.email,
    address: auth?.user?.address,
    password: auth?.user?.password,
  });
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${host}/api/v1/auth/update-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.user;
        localStorage.setItem("auth", JSON.stringify(ls));
        setAuth({
          ...auth,
          user: ls.user,
        });
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout update={handleSubmit}>
      <div className="admin-dashboard">
        <div className="row no-padding my-account-wrapper">
          <UserMenu />
          <div className="col-sm-4 no-padding">
            <div className="update-profile">
              <h1 className="edit-heading">Edit Account Information</h1>
              <h2 className="edit-subheading">Account Information</h2>
              <form className="edit-profile" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-6 edit-input">
                    <label>Name</label>
                    <input
                      onChange={onChange}
                      name="name"
                      type="text"
                      value={credentials.name}
                    />
                  </div>
                  <div className="col-sm-6 edit-input">
                    <label>Email</label>
                    <input
                      onChange={onChange}
                      type="email"
                      readOnly
                      name="email"
                      value={auth?.user?.email}
                    />
                  </div>
                  <div className="col-sm-6 edit-input">
                    <label>Address</label>
                    <input
                      onChange={onChange}
                      type="text"
                      name="address"
                      value={credentials.address}
                    />
                  </div>
                  <div className="col-sm-6 edit-input">
                    <label>Password</label>
                    <input
                      onChange={onChange}
                      type="password"
                      name="password"
                      value={credentials.password}
                    />
                  </div>
                </div>
                <div className="edit-btn col-sm-12">
                  <button className="edit-form-btn">Save & Continue</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
