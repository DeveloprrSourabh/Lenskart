import React from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
const AdminDashboard = () => {
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="row">
          <div className="col-sm-4">
            <AdminMenu />
          </div>
          <div className="col-sm-8">Admin Dashboard</div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
