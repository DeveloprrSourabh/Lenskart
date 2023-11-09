import React from "react";
import Layout from "../Components/Layout";
import { useCart } from "../context/cart";
import { Link } from "react-router-dom";
const host = "http://localhost:8080";

const CartPage = () => {
  const [cart, setCart] = useCart();

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

  return (
    <Layout>
      <div className="main-cart">
        <div
          className="cart-page container mx-auto w-75
        "
        >
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
      </div>
    </Layout>
  );
};

export default CartPage;
