import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
const AdminMenu = () => {
  const location = useLocation();

  return (
    <>
      <div className="col-sm-3 col-md-3">
        <ul className="my-ac-list">
          <li>
            <Link
              to={"/dashboard/admin/profile"}
              className={`${
                location.pathname === "/dashboard/admin/profile" ? "active" : ""
              }`}
            >
              Account Information
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/admin/create-category"}
              className={`${
                location.pathname === "/dashboard/admin/create-category"
                  ? "active"
                  : ""
              }`}
            >
              Create Category
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/admin/create-product"}
              className={`${
                location.pathname === "/dashboard/admin/create-product"
                  ? "active"
                  : ""
              }`}
            >
              Create Product
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/admin/products"}
              className={`${
                location.pathname === "/dashboard/admin/products"
                  ? "active"
                  : ""
              }`}
            >
              Product
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/admin/orders"}
              className={`${
                location.pathname === "/dashboard/admin/orders" ? "active" : ""
              }`}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard/admin/user"}
              className={`${
                location.pathname === "/dashboard/admin/user"
              } ? 'active':""`}
            >
              User
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
