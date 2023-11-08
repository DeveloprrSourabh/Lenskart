import React from "react";
import Layout from "../Components/Layout";
import Register from "./Auth/Register";
import useCategory from "../hooks/useCategory";

const Home = () => {
  const categories = useCategory();
  return (
    <Layout>
      <div className="home-page">
        <div className="main-product-page">
          <div className="row my-3">
            <div className="col-sm-4">
              <div className="product-sidebar">
                <div className="sidebar-category">
                  {categories &&
                    categories.map((c) => {
                      return (
                        <ul className="category-list">
                          <li className="cat-item">
                            <input type="checkbox" name={c.name} id="" />
                            <label>{c.name}</label>
                          </li>
                        </ul>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="col-sm-8">fsfsdsdf</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
