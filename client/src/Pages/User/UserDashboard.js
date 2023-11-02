import React from "react";
import Layout from "../../Components/Layout";
import UserMenu from "../../Components/UserMenu";

const UserDashboard = () => {
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="row">
          <div className="col-sm-4">
            <UserMenu />
          </div>
          <div className="col-sm-8">User Dashboard</div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
