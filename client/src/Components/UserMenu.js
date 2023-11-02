import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="col-sm-3 col-md-3">
        <ul className="my-ac-list">
          <li>
            <Link to={"./profile"}>Account Information</Link>
          </li>
          <li>
            <Link to={"./profile"}>Account Information</Link>
          </li>
          <li>
            <Link to={"./profile"}>Account Information</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
