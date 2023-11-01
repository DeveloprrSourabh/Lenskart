import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ props }) => {
  return (
    <>
      <Header />
      {props}
      <Footer />
    </>
  );
};

export default Layout;
