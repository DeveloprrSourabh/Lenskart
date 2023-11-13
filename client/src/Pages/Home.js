import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Register from "./Auth/Register";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

import Slider from "react-slick";

const host = "http://localhost:8080";

const Home = () => {
  // Banner Slider
  var settings = {
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // Trending Products
  var trending = {
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const [products, setProducts] = useState([]);
  const categories = useCategory();

  // Getting To Products
  const getTopProduct = async () => {
    try {
      const res = await fetch(`${host}/api/v1/product/top-product`, {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTopProduct();
  }, []);
  return (
    <Layout>
      <div className="home-pages">
        <div className="main-home">
          {/* Top Product Section */}
          <section className="top-product">
            <div className="main-top-product">
              <div className="row">
                {products?.map((p) => {
                  return (
                    <div className="col-sm-2">
                      <Link
                        className="text-dark"
                        key={p._id}
                        to={`/shop/${p.slug}`}
                      >
                        <div className="main-card-product">
                          <div className="top-prdt-img">
                            <div className="prdt-car-img">
                              <img
                                className="w-100"
                                src={`${host}/api/v1/product/product-photo/${p.slug}`}
                                alt=""
                              />
                            </div>
                            <div className="prdt-names">{p.name}</div>
                          </div>
                          <div className="prdt-bio">
                            <div className="d-flex mb-2 justify-content-between">
                              <div className="prdt-prices">Price</div>
                              <div className="prdt-prices-val">{p.price}</div>
                            </div>
                            <hr />
                            <div className="d-flex pb-2 justify-content-between">
                              <div className="prdt-prices">Name</div>
                              <div className="prdt-prices-val">{p.name}</div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}{" "}
              </div>
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-3">
            <div className="banner-img">
              <img className="w-100" src="/Images/banner1.webp" alt="" />
            </div>
          </section>
          {/* Slick Slider */}
          <section className="banner-slider">
            <div className="sliders">
              <Slider {...settings}>
                <div className="slick-img">
                  <img className="w-100" src="/Images/banner2.webp" alt="" />
                </div>
                <div className="slick-img">
                  <img className="w-100" src="/Images/banner3.jpeg" alt="" />
                </div>
                <div className="slick-img">
                  <img className="w-100" src="/Images/banner4.webp" alt="" />
                </div>
              </Slider>
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-3">
            <div className="banner-img">
              <img
                className="w-100"
                src="/Images/Bannerforexport.webp"
                alt=""
              />
            </div>
          </section>
          {/* Slider Trending Product */}
          <section className="trending-product ">
            <div className="trending-main">
              <div className="row mx-auto container-fluid justify-content-center">
                <div className="col-sm-2">
                  <div className="wearTrend">
                    WEAR THE
                    <div className="trendwear">TREND</div>
                    <div className="trendytag">Our hottest collections</div>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="trending-prdt row">
                    <Slider {...trending}>
                      {products?.map((p) => {
                        return (
                          <div className="col-sm-3">
                            <div className="explore-trending-prdt">
                              <div className="trending-img">
                                <img
                                  className="w-75 mx-auto"
                                  src={`${host}/api/v1/product/product-photo/${p.slug}`}
                                  alt=""
                                />
                              </div>
                              <div className="trending-prdt-name">{p.name}</div>
                              <Link
                                to={`/shop/${p.slug}`}
                                className="trending-prdt-explore"
                              >
                                Explore
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-2">
            <h4 className="banner-heading position-relative me-auto ms-auto text-center">
              PREMIUM EYEWEAR
            </h4>
            <div className="banner-img">
              <img className="w-100" src="/Images/seendesk.webp" alt="" />
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-2">
            <h4 className="banner-heading position-relative me-auto ms-auto text-center">
              AS SEEN ON MOUNI ROY
            </h4>
            <div className="banner-img">
              <img className="w-100" src="/Images/monyroy.webp" alt="" />
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-2">
            <h4 className="banner-heading position-relative me-auto ms-auto text-center">
              AS SEEN ON SHARK TANK
            </h4>
            <div className="banner-img">
              <img
                className="w-100"
                src="/Images/Homepage-Banner-web.webp"
                alt=""
              />
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-2">
            <h4 className="banner-heading position-relative me-auto ms-auto text-center">
              AS SEEN ON KARAN JOHAR
            </h4>
            <div className="banner-img">
              <img className="w-100" src="/Images/Web_banner.webp" alt="" />
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-2">
            <h4 className="banner-heading position-relative me-auto ms-auto text-center">
              TRENDING SUNGLASSES
            </h4>
            <div className="banner-img">
              <img className="w-100" src="/Images/Sun-Banner-web.webp" alt="" />
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-2">
            <h4 className="banner-heading position-relative me-auto ms-auto text-center">
              OJOS
            </h4>
            <div className="banner-img">
              <img className="w-100" src="/Images/ojos-web-1199.webp" alt="" />
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-2">
            <h4 className="banner-heading position-relative me-auto ms-auto text-center">
              AQUACOLOR - GLAM UP WITH COLOR LENSES
            </h4>
            <div className="banner-img">
              <img
                className="w-100"
                src="/Images/Refresh-Banner-Web.webp"
                alt=""
              />
            </div>
          </section>

          {/* Banner section */}
          <section className="banner-section py-2">
            <h4 className="banner-heading position-relative me-auto ms-auto text-center">
              FIND THE PERFECT FIT
            </h4>
            <div className="row container mx-auto">
              <div className="col-sm-6 px-2 py-2">
                <div className="banner-img">
                  <img
                    className="w-100"
                    src="/Images/eye-square10.webp"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-sm-6 px-2 py-2">
                <div className="banner-img mb-3">
                  <img className="w-100" src="/Images/ce-square.webp" alt="" />
                </div>
                <div className="banner-img">
                  <img className="w-100" src="/Images/sun-square.webp" alt="" />
                </div>
              </div>

              <div className="col-sm-6 px-2 py-2">
                <div className="banner-img">
                  <img
                    className="w-100"
                    src="/Images/power-sun-square.webp"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-sm-6 px-2 py-2">
                <div className="banner-img">
                  <img
                    className="w-100"
                    src="/Images/Banner03_TileDesktop.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-2">
            <h4 className="banner-heading position-relative me-auto ms-auto text-center">
              INTRODUCING OJOS WEAR - SUBSCRIBE & SAVE
            </h4>
            <div className="banner-img">
              <img className="w-100" src="/Images/ojos-web.webp" alt="" />
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-2">
            <h4 className="banner-heading position-relative me-auto ms-auto text-center">
              CONTACT LENSES & MORE
            </h4>
            <div className="row container mx-auto">
              <div className="col-sm-6 px-2 py-2">
                <div className="banner-img">
                  <img
                    className="w-100"
                    src="/Images/contact-lens-more.webp"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-sm-6 px-2 py-2">
                <div className="banner-img">
                  <img
                    className="w-100"
                    src="/Images/contact-lens-more-1.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-2">
            <h4 className="banner-heading position-relative me-auto ms-auto text-center">
              BUY IT YOUR WAY
            </h4>
            <div className="row container mx-auto">
              <div className="col-sm-6 px-2 py-2">
                <div className="banner-img">
                  <img className="w-100" src="/Images/call1800.webp" alt="" />
                </div>
              </div>
              <div className="col-sm-6 px-2 py-2">
                <div className="banner-img">
                  <img className="w-100" src="/Images/call1800.webp" alt="" />
                </div>
              </div>
              <div className="col-sm-6 px-2 py-2">
                <div className="banner-img">
                  <img className="w-100" src="/Images/hto.webp" alt="" />
                </div>
              </div>
              <div className="col-sm-6 px-2 py-2">
                <div className="banner-img">
                  <img className="w-100" src="/Images/stores.webp" alt="" />
                </div>
              </div>
            </div>
          </section>
          {/* Banner section */}
          <section className="banner-section py-2">
            <h4 className="banner-heading position-relative me-auto ms-auto text-center">
              OUR BRANDS
            </h4>
            <div className="banner-img">
              <img className="w-100" src="/Images/VC-Banner.webp" alt="" />
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
