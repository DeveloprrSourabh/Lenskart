import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useCart } from "../context/cart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
import axios from "axios";
const host = "http://localhost:8080";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState("");
  // Remove Item From Cart
  const handleRemove = async (id) => {
    try {
      let myCart = [...cart];
      myCart = myCart.filter((c) => {
        return c._id !== id;
      });
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Get Total  Price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  // Get Token
  const getToken = async () => {
    try {
      const res = await fetch(`${host}/api/v1/product/braintree/token`, {
        method: "GET",
        headers: {
          Authorization: auth?.token,
        },
      });
      const data = await res.json();
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Hanlde Payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${host}/api/v1/product/braintree/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();
      console.log(data);
      setLoading(true);
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Payment Completed Successfully");

      navigate("/shop");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div
        className={`main-cart container mx-auto ${
          cart.length > 0 ? "row" : ""
        }`}
      >
        <div className={`cart-page ${cart.length > 0 ? "col-sm-9" : ""}`}>
          {cart.length > 0 ? (
            cart?.map((c) => {
              return (
                <div className="cart-card d-flex gap-4 my-3">
                  <div className="cart-prdt-img">
                    <img
                      className="w-100"
                      src={`${host}/api/v1/product/product-photo/${c.slug}`}
                      alt=""
                    />
                  </div>
                  <div className="prdt-details">
                    <h2 className="prdt-name">
                      <b className="text-dark">Product Name : </b> {c.name}
                    </h2>
                    <h1 className="prdt-name">
                      <b className="text-dark">Product Description : </b>
                      {c.description}
                    </h1>
                    <div className="cart-price prdt-price">
                      <b className="text-dark">Product Price : </b>₹{c.price}
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      handleRemove(c._id);
                    }}
                    className="btn btn-danger btn-sm removecart"
                  >
                    Remove
                  </div>
                </div>
              );
            })
          ) : (
            <div className="emptycart">
              <div className="empty-heading">
                Your shopping cart is empty! !
              </div>
              <div className="empty-btn">
                <Link to="/shop">Continue Shopping</Link>
              </div>
            </div>
          )}
        </div>
        {cart.length > 0 ? (
          <div className="col-sm-3">
            CHEKOUT || PAYMENT
            <div className="total-price">Total Price :{totalPrice()}</div>
            <div className="address">Address : {auth?.user?.address}</div>
            <div className="mt-2">
              {!clientToken || !cart ? (
                ""
              ) : (
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
              )}

              <button
                className="btn btn-primary"
                onClick={handlePayment}
                disabled={loading || !instance || !auth?.user?.name}
              >
                {loading ? "Processing...." : "Make Payment"}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <button className="btn btn-primary" onClick={handlePayment}>
        click
      </button>
    </Layout>
  );
};

export default CartPage;
