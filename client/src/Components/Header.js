import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
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
                    <img src="./Images/main_logo.svg" alt="" />
                  </Link>
                </div>
                <div className="d-flex align-items-center number-logo">
                  <img src="./Images/lsNum.jpg" alt="" />
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
                  <li>
                    <Link>Sign In & Sign Up</Link>
                  </li>
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
  );
};

export default Header;
