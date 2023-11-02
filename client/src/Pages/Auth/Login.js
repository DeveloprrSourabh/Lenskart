import React, { useState } from "react";
import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const host = "http://localhost:8080";
const Login = ({ showLogin, setShowLogin, setShow }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
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
      const res = await fetch(`${host}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User Login Successfully");
        localStorage.setItem("auth", JSON.stringify(data));
      } else {
        toast.error("User Not Login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div id="register-form">
      <form className="register" onSubmit={handleSubmit}>
        <div className="create-heading d-flex justify-content-between">
          <h2 className="create-account">Login</h2>
          <span
            className="form-cancel"
            onClick={() => {
              setShowLogin(false);
              const body = document.getElementById("root");
              body.classList.remove("formShow");
            }}
          >
            X
          </span>
        </div>

        <div className="register-input">
          <input
            onChange={onChange}
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Email*"
          />
        </div>
        <div className="register-input">
          <input
            onChange={onChange}
            type="password"
            value={credentials.password}
            name="password"
            id=""
            placeholder="Password*"
          />
        </div>
        <button className="register-btn">Login</button>
        <div className="have-account">
          <span>New member?</span>
          <Link
            onClick={() => {
              setShow(true);
              setShowLogin(false);
            }}
          >
            {" "}
            Create an Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
