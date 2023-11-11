import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const host = "http://localhost:8080";

const SingleShop = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});

  //   Get Single Product
  const getSingleProduct = async () => {
    try {
      const res = await fetch(
        `${host}/api/v1/product/get-product/${params.slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);
  return (
    <Layout>
      <div className="single-product">
        <div className="row">
          <div className="col-sm-8 not-scroller">
            <div className="row">
              <div className="col-sm-6 ">
                <div className="sgl-prdt-img">
                  <img
                    className=""
                    src={`${host}/api/v1/product/product-photo/${params.slug}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-sm-6 ">
                <div className="sgl-prdt-img">
                  <img
                    className=""
                    src={`${host}/api/v1/product/product-photo/${params.slug}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-sm-6 ">
                <div className="sgl-prdt-img">
                  <img
                    className=""
                    src={`${host}/api/v1/product/product-photo/${params.slug}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-sm-6 ">
                <div className="sgl-prdt-img">
                  <img
                    className=""
                    src={`${host}/api/v1/product/product-photo/${params.slug}`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="product-details">
              <div className="single-details">
                <h2 className="prdt-name">{product.name}</h2>
                <h1 className="prdt-desc">{product.description}</h1>
              </div>
              <div className="prdt-price">
                ₹{product.price}
                <span className="with-gst">( ₹1700 with GST )</span>
              </div>
            </div>
            <div className="add-banner">
              <img className="w-100" src="/Images/bottomsheet1.jpeg" alt="" />
            </div>
            <div className="warranty my-3">
              <div className="warranty-heading ">SELECT LENSES</div>
              <div className="warranty-desc ">
                ( with 1 Year Warranty & 14 Day Return )
              </div>
            </div>
            <div
              className="addtocart"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item Added to cart");
              }}
            >
              <button className="btn text-light">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleShop;
