import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Register from "./Auth/Register";
import useCategory from "../hooks/useCategory";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import { Prices } from "../Components/Prices";

const host = "http://localhost:8080";

const Shop = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [show, setShow] = useState(false);
  // Get All Products
  const getAllProducts = async () => {
    try {
      const res = await fetch(`${host}/api/v1/product/get-products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        console.log("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!radio.length && !checked.length) getAllProducts();
    {
      setTimeout(() => {
        setShow(true);
      }, 999);
    }
  }, [radio.length, checked.length]);
  const categories = useCategory();

  // Filter Product
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (checked.length > 0 || radio.length) getFilterProduct();
  }, [checked, radio]);
  //Get Filtered Product
  const getFilterProduct = async () => {
    try {
      const res = await fetch(`${host}/api/v1/product/product-filters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checked, radio }),
      });
      const data = await res.json();
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="home-page">
        <div className="main-product-page">
          <div className="main-banner mb-3">
            <img src="/Images/ROUNDS.webp" alt="" />
          </div>
          <div className="row my-3">
            <div className="col-sm-3 filter-col scroller">
              <div className="product-sidebar">
                <div className="sidebar-category">
                  <h3 className="cat-filt">Frame Category</h3>
                  <div className="filters">
                    <ul className="category-list">
                      {categories &&
                        categories.map((c) => {
                          return (
                            <li className="cat-item d-flex">
                              <div className="cat-filter">
                                <input
                                  type="checkbox"
                                  name={c.name}
                                  id=""
                                  onChange={(e) => {
                                    handleFilter(e.target.checked, c._id);
                                  }}
                                />
                              </div>
                              <label>{c.name}</label>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <h3 className="cat-filt mb-3">Frame Price</h3>
                  <div className="filters">
                    <ul className="category-list">
                      {Prices &&
                        Prices.map((c) => {
                          return (
                            <li className="cat-item d-flex">
                              <div className="cat-filter">
                                <input
                                  type="radio"
                                  value={c.array}
                                  onChange={(e) => {
                                    setRadio(
                                      e.target.value.split(",").map(Number)
                                    );
                                  }}
                                  name="price"
                                  id=""
                                />
                              </div>
                              <label>{c.name}</label>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-9 ps-1 ">
              <div className="all-products-shop">
                <div className="sortby">
                  <div className="d-flex justify-content-between">
                    <div className="sortname position-relative">
                      <i class="fa-solid fa-arrow-up-short-wide"></i> SORT BY
                    </div>
                    <div className="sorted">
                      <div className="sort-select">
                        <select name="" id="">
                          <option value="best-seller">Best Seller</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="all-product my-4 px-3">
                  <div className="all-products not-scroller mb-4 row">
                    {products &&
                      products.map((p) => {
                        return (
                          <div key={p?._id} className=" col-sm-4 p-0">
                            <Link
                              to={`/shop/${p.slug}`}
                              className="d-block mb-4 main-product"
                            >
                              <div className="product-img">
                                {show ? (
                                  <img
                                    className="w-100"
                                    // src="/Images/lens.jpg
                                    src={`${host}/api/v1/product/product-photo/${p?.slug}`}
                                    alt={p._id}
                                  />
                                ) : (
                                  "Loading Image..."
                                )}
                              </div>
                              <div className="product-details">
                                <div className="stars d-flex gap-1">
                                  <span className="star">
                                    4.6 <i class="fa-solid fa-star"></i>
                                  </span>
                                  <span className="review">26</span>
                                </div>
                                <div className="company pt-3 pb-2">
                                  {auth?.user?.name.substring(0, 20)}
                                </div>
                                <div className="quantity py-1">
                                  Quantity: {p.quantity}
                                </div>
                                <div className="price">₹ {p.price}</div>
                              </div>
                              <div className="last-item">
                                Get For ₹700. Coupon: EYECON
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
