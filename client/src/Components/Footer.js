import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer id="mastfooter">
        <div className="main-footer">
          <div className="first-sec ">
            <h1 className="">Buy The Best Eyewear From Lenskart</h1>
            <p className="footer-para">
              Lenskart Is The Leading E-Commerce Portal For Eyewear In India. It
              Has Revolutionised The Eyewear Industry In The Country With Its
              Omni-Channel Approach. From An Ever-Growing Number Of Offline
              Stores Across Major Cities In The Country To Innovative
              Integration Of Technology While Purchasing Online, Lenskart Caters
              To Every Customer With Several Deals And Offers.
            </p>
            <p className="footer-para">
              A One-Stop Online Solution For Purchasing Eyewear And Its
              Accessories, Lenskart Delivers Them Right At Your Doorstep With
              Convenient Methods Of Payment. Sunglasses as well as Eyeglasses
              Are Available For Men And Women In A Diverse Array Of Styles And
              Trendy Colours. If You Want To Try Out Contact Lenses, Pick The
              Ones Of Your Choice From The Extensive Variety Of Coloured Contact
              Lenses From Our Online Store.
            </p>
          </div>
          <div className="second-sec">
            <div className="row justify-content-between">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-4">
                    <h2 className="footer-menu-heading">Services</h2>
                    <ul className="footer-menu">
                      <li className="footer_menu-list">
                        <Link>Store Locator</Link>
                      </li>
                      <li className="footer_menu-list">
                        <Link>Buying Guide</Link>
                      </li>
                      <li className="footer_menu-list">
                        <Link>Frame Size</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <h2 className="footer-menu-heading">About Us</h2>
                    <ul className="footer-menu">
                      <li className="footer_menu-list">
                        <Link>We Are Hiring</Link>
                      </li>
                      <li className="footer_menu-list">
                        <Link>Refer And Earn</Link>
                      </li>
                      <li className="footer_menu-list">
                        <Link>About us</Link>
                      </li>
                      <li className="footer_menu-list">
                        <Link>Lenskart Coupons</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <h2 className="footer-menu-heading">Help</h2>
                    <ul className="footer-menu">
                      <li className="footer_menu-list">
                        <Link>FAQ's</Link>
                      </li>
                      <li className="footer_menu-list">
                        <Link>Buying Guide</Link>
                      </li>
                      <li className="footer_menu-list">
                        <Link>Frame Size</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-3 d-flex flex-column justify-content-center">
                <div className=" d-inline-flex justify-content-center">
                  <div className="mx-1">
                    <img
                      src="/Images/play-store.svg"
                      alt=""
                      className="store-img"
                    />
                  </div>
                  <div className="mx-1">
                    <img
                      src="/Images/app-store.svg"
                      alt=""
                      className="store-img"
                    />
                  </div>
                </div>
                <div className="store-desc">
                  <span>Download Lenskart App to buy</span>
                  <br />
                  <span>Eyeglasses, Sunglasses and Contact Lenses</span>
                </div>
              </div>
            </div>
          </div>
          <hr className="footer-line"></hr>
          <div className="third-sec  d-flex justify-content-between">
            <div className="last-footer_first">
              <ul className="last-one_ul d-flex gap-5 ">
                <li>
                  <Link className="text-light">T & C</Link>
                </li>
                <li>
                  <Link className="text-light">Privacy</Link>
                </li>
                <li>
                  <Link className="text-light">Disclaimer</Link>
                </li>
              </ul>
            </div>
            <div className="last_footer_second">
              <ul className="last-second_ul d-flex gap-3 align-items-center">
                <li className="text-light">Version 1.0.0 || Follow Us</li>
                <li>
                  <Link>
                    <i className="text-light fa-brands fa-square-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="text-light fa-brands fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link>
                    <i className="text-light fa-brands fa-twitter"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
