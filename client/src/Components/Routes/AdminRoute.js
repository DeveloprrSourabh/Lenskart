import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
const host = "http://localhost:8080";
const AdminRoute = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    console.log(auth);
    const authCheck = async () => {
      const res = await fetch(`${host}/api/v1/auth/admin-auth`, {
        method: "GET",
        headers: {
          Authorization: auth?.token,
        },
      });
      const data = await res.json();
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : "Loading...";
};

export default AdminRoute;
