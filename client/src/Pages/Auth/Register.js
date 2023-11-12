import React, { useState } from "react";
import Layout from "../../Components/Layout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const host = "http://localhost:8080";
const Register = ({ show, setShow, setShowLogin }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    answer: "",
    role: "",
    address: "",
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
      const res = await fetch(`${host}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User Register Successfully");
        setShow(false);
        const body = document.getElementById("root");
        body.classList.remove("formShow");
      } else {
        toast.error("User Not Register");
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
          <h2 className="create-account">Create an Account</h2>
          <span
            className="form-cancel"
            onClick={() => {
              setShow(false);
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
            type="text"
            name="name"
            value={credentials.name}
            placeholder="Name*"
          />
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
            type="number"
            name="role"
            value={credentials.role}
            placeholder="Role*"
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
        <div className="register-input">
          <input
            onChange={onChange}
            type="answer"
            name="answer"
            id=""
            placeholder="Answer*"
            value={credentials.answer}
          />
        </div>
        <div className="register-input">
          <input
            onChange={onChange}
            type="address"
            name="address"
            id=""
            value={credentials.address}
            placeholder="Address*"
          />
        </div>
        <button className="register-btn">Create an Account</button>
        <div className="have-account">
          <span>Have an account?</span>
          <Link
            onClick={() => {
              setShow(false);
              setShowLogin(true);
            }}
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
