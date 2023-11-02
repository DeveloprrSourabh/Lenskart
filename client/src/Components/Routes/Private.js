import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";

const host = "http://localhost:8080";

const Private = () => {
  const [ok, setOk] = useState(false);
  const [auth, setauth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await fetch(`${host}/api/v1/auth/user-auth`, {
        method: "GET",
        headers: {
          Authorization: auth?.token,
        },
      });
      const data = await res.json();
      if (data.ok) {
        setOk(true);
        console.log(data);
      } else {
        setOk(false);
        console.log(data);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  });
  return ok ? <Outlet></Outlet> : "Loading...";
};

export default Private;
