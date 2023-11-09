import React from "react";
import Layout from "../Components/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

const host = "http://localhost:8080";

const SearchPage = () => {
  const [auth, setAuth] = useAuth();
  const [value, setValue] = useSearch();
  return (
    <Layout>
      <div className="searchpage container">
        <div className="total-search my-4">
          {value.results && "Search Result : " + value.results.length}
        </div>
        <div className="all-products not-scroller mb-4 row">
          {value.results &&
            value.results.map((p) => {
              return (
                <div key={p?._id} className=" col-sm-4 p-0">
                  <Link
                    to={`/shop/${p.slug}`}
                    className="d-block mb-4 main-product"
                  >
                    <div className="product-img">
                      <img
                        className="w-100"
                        // src="/Images/lens.jpg
                        src={`${host}/api/v1/product/product-photo/${p?.slug}`}
                        alt={p._id}
                      />
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
    </Layout>
  );
};

export default SearchPage;
