import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import AdminMenu from "../../Components/AdminMenu";
import toast from "react-hot-toast";

const host = "http://localhost:8080";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [status, setStatus] = useState([
    "Processing",
    "Not Process",
    "shipped",
    "Deliverd",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  // Getting All Orders
  const getOrders = async () => {
    try {
      const res = await fetch(`${host}/api/v1/product/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
      });
      const data = await res.json();
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleChage = async (id, e) => {
    try {
      const res = await fetch(`${host}/api/v1/product/order-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth?.token,
        },
        body: JSON.stringify({ status: e.target.value }),
      });
      const data = await res.json();
      if (data?.success) toast.success(data?.message);
      if (!data?.success) toast.error(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="no-padding my-account-wrapper row">
          <AdminMenu />
          <div className="col-sm-9 col-md-9 no-padding margin-b10">
            <h2 className="all-order">All Orders</h2>
            {orders?.map((o, i) => {
              return (
                <>
                  <table className="table">
                    <thead>
                      <tr>
                        <td>#</td>
                        <td>Status</td>
                        <td>Buyer</td>
                        <td>Date</td>
                        <td>Quantity</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{i + 1}</th>
                        <th>
                          <div className="edit-input m-0">
                            <select
                              className="w-80"
                              defaultValue={o?.status}
                              onChange={(value) => handleChage(o._id, value)}
                              id=""
                            >
                              {status?.map((c, i) => {
                                return (
                                  <option key={i} value={c}>
                                    {c}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </th>
                        <th>{o?.buyer?.name}</th>
                        <th>{moment(o?.createdAt).fromNow()}</th>
                        <th>{o?.products?.length}</th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="main-orders">
                    {o?.products?.map((c) => {
                      return (
                        <>
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
                                <b className="text-dark">Product Name : </b>{" "}
                                {c.name}
                              </h2>
                              <h1 className="prdt-name">
                                <b className="text-dark">
                                  Product Description :{" "}
                                </b>
                                {c.description}
                              </h1>
                              <div className="cart-price prdt-price">
                                <b className="text-dark">Product Price : </b>₹
                                {c.price}
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;
