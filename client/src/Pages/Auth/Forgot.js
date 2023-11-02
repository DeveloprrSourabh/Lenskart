import React, { useState } from "react";
import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const host = "http://localhost:8080";
const Login = ({ showForgot, setShowForgot, setShowLogin, setShow }) => {
  const [auth, setAuth] = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    answer: "",
    newPassword: "",
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
      const res = await fetch(`${host}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          setShowForgot(false);
          const body = document.getElementById("root");
          body.classList.remove("formShow");
        }, 1000);
      } else {
        toast.error(data.message);
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
          <h2 className="create-account">Forgot Password</h2>
          <span
            className="form-cancel"
            onClick={() => {
              setShowForgot(false);
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
            type="text"
            value={credentials.answer}
            name="answer"
            id=""
            placeholder="Answer*"
          />
        </div>
        <div className="register-input">
          <input
            onChange={onChange}
            type="password"
            value={credentials.newPassword}
            name="newPassword"
            id=""
            placeholder="New Password*"
          />
        </div>
        <button className="register-btn">Reset Password</button>
      </form>
    </div>
  );
};

export default Login;
