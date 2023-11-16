import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import Forgot from "../Pages/Auth/Forgot";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import Search from "./Forms/Search";
const Header = () => {
  const [cart, setCart] = useCart();
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [auth, setAuth] = useAuth();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  return (
    <>
      <div>
        <header>
          <div id="masthead" className="header">
            <div className="mb-2 main-header d-flex justify-content-between">
              <div className=" ">
                <ul className="header_ul d-flex">
                  <li className="header_item">
                    <Link to={"/"}>Do More, Be More</Link>
                  </li>
                  <li className="header_item">
                    <Link to={"/"}>Tryin3D</Link>
                  </li>
                  <li className="header_item">
                    <Link to={"/"}>StoreLocator</Link>
                  </li>
                  <li className="header_item">
                    <Link to={"/"}>Singapore</Link>
                  </li>
                  <li className="header_item">
                    <Link to={"/"}>John Jacobs</Link>
                  </li>
                  <li className="header_item">
                    <Link to={"/"}>Cobrowsing</Link>
                  </li>
                  <li className="header_item">
                    <Link to={"/"}>Engineering Blog</Link>
                  </li>
                  <li className="header_item">
                    <Link to={"/"}>Lenskart Franchise</Link>
                  </li>
                </ul>
              </div>
              <div className="">
                <div className="header_contact">
                  <Link to="/">Contact Us</Link>
                </div>
              </div>
            </div>
            <div className="second-header">
              <ul className=" row sec_head d-flex align-items-center">
                <li className="col-md-4 seond_head_list d-flex">
                  <div className="main-logo">
                    <Link to={"/"}>
                      <img src="/Images/main_logo.svg" alt="" />
                    </Link>
                  </div>

                  <div className="d-flex align-items-center number-logo">
                    <img src="/Images/lsNum.jpg" alt="" />
                  </div>
                  <div className="d-none align-items-center mobile-menu">
                    <Link to="/cart" className="text-end mx-3">
                      <img src="/Images/bag.svg" width={"20%"} alt="" />
                    </Link>
                    <button
                      className="bars mt-1"
                      onClick={() => {
                        setMenu(true);
                        const body = document.getElementById("root");
                        body.classList.add("formShow");
                      }}
                    >
                      <i class="fa-solid fa-bars"></i>
                    </button>
                  </div>
                </li>
                <li className="col-md-4 seond_head_list">
                  <Search />
                </li>
                <li
                  className={`col-md-4 second_head_list ${
                    menu ? "active" : ""
                  }`}
                >
                  <ul className="other-menu d-flex align-items-center justify-content-between">
                    <div className="d-none  mobile-menu-head justify-content-between align-items-center">
                      <div className="mobile-sec-img">
                        <img
                          className="w-75 mx-0"
                          src="/Images/main_logo.svg"
                          alt=""
                        />
                      </div>
                      <div
                        className="cross-menu"
                        onClick={() => {
                          setMenu(false);
                          const body = document.getElementById("root");
                          body.classList.remove("formShow");
                        }}
                      >
                        <b>X</b>
                      </div>
                    </div>
                    <li>
                      <Link>Track Order</Link>
                    </li>
                    {auth && auth.user ? (
                      <div>
                        <li
                          onClick={() => {
                            let header =
                              document.getElementsByClassName("header-user")[0];
                            let headerUl =
                              document.getElementsByClassName(
                                "header-user_ul"
                              )[0];
                            headerUl.classList.toggle("active");
                          }}
                          className="header-user position-relative"
                        >
                          <Link>{auth?.user?.name} </Link>
                          <span className="header_user_rotate">▾</span>

                          <ul className="header-user_ul">
                            <li
                              onClick={() => {
                                const body = document.getElementById("root");
                                body.classList.remove("formShow");
                              }}
                            >
                              <Link
                                className="header-user_list"
                                to={`/dashboard/${
                                  auth?.user?.role === 1 ? "admin" : "user"
                                }/profile`}
                              >
                                Dashboard
                              </Link>
                            </li>

                            <li
                              onClick={() => {
                                const body = document.getElementById("root");
                                body.classList.remove("formShow");
                              }}
                            >
                              <Link
                                onClick={handleLogout}
                                className="header-user_list"
                                to=""
                              >
                                Logout
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </div>
                    ) : (
                      <li>
                        <Link
                          onClick={() => {
                            show ? <></> : setShowLogin(true);
                            setMenu(false);
                            const body = document.getElementById("root");
                            body.classList.add("formShow");
                          }}
                        >
                          Sign In
                        </Link>
                        <Link
                          onClick={() => {
                            showLogin ? <> </> : setShow(true);
                            setMenu(false);
                            const body = document.getElementById("root");
                            body.classList.add("formShow");
                          }}
                        >
                          & Sign Up
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link>
                        <img src="/Images/heart.svg" alt="" /> Wishlist
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        const body = document.getElementById("root");
                        body.classList.remove("formShow");
                      }}
                    >
                      <img src="/Images/bag.svg" alt="" />
                      <Link to={"/cart"}>Cart ( {cart?.length} )</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </header>
      </div>
      {show ? (
        <Register
          show={show}
          setShow={setShow}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          showForgot={showForgot}
          setShowForgot={setShowForgot}
        />
      ) : (
        ""
      )}
      {showLogin ? (
        <Login
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          show={show}
          setShow={setShow}
          showForgot={showForgot}
          setShowForgot={setShowForgot}
        />
      ) : (
        ""
      )}
      {showForgot ? (
        <Forgot
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          show={show}
          setShow={setShow}
          showForgot={showForgot}
          setShowForgot={setShowForgot}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
