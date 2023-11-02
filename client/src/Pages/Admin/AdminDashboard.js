import React from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
const AdminDashboard = () => {
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="no-padding my-account-wrapper">
          <AdminMenu />
        </div>
        <div className="col-sm-9 col-md-9 no-padding">Admin Dashboard</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
