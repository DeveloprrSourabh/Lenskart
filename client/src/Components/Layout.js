import React from "react";
import Header from "./Header";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./Footer";

const Layout = ({ children, update }) => {
  return (
    <>
      <Header update={update} />
      <Toaster />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
