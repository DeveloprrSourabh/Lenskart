import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import Forgot from "../Pages/Auth/Forgot";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
const Header = () => {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [auth, setAuth] = useAuth();
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
                </li>
                <li className="col-md-4 seond_head_list">
                  <div className="search_form">
                    <form>
                      <input
                        type="text"
                        className="search_input"
                        placeholder="What are you looking for?"
                      />
                    </form>
                  </div>
                </li>
                <li className="col-md-4 second_head_list">
                  <ul className="other-menu d-flex align-items-center justify-content-between">
                    <li>
                      <Link>Track Order</Link>
                    </li>
                    {auth && auth.user ? (
                      <div>
                        <li className="header-user position-relative">
                          <Link>{auth?.user?.name} </Link>
                          <span className="header_user_rotate">▾</span>

                          <ul className="header-user_ul">
                            <li>
                              <Link
                                className="header-user_list"
                                to={`/dashboard/${
                                  auth?.user?.role === 1 ? "admin" : "user"
                                }/profile`}
                              >
                                Dashboard
                              </Link>
                            </li>

                            <li>
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
                            const body = document.getElementById("root");
                            body.classList.add("formShow");
                          }}
                        >
                          Sign In
                        </Link>
                        <Link
                          onClick={() => {
                            showLogin ? <> </> : setShow(true);
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
                    <li>
                      <img src="/Images/bag.svg" alt="" />
                      <Link>Cart</Link>
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
