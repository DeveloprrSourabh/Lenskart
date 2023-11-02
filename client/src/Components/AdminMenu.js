import React from "react";
import { Link } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="col-sm-3 col-md-3">
        <ul className="my-ac-list">
          <li>
            <Link to={"/dashboard/admin/profile"}>Account Information</Link>
          </li>
          <li>
            <Link to={"/dashboard/admin/create-category"}>Create Category</Link>
          </li>
          <li>
            <Link to={"/dashboard/admin/create-product"}>Create Product</Link>
          </li>
          <li>
            <Link to={"/dashboard/admin/user"}>User</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
