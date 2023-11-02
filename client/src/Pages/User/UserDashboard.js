import React from "react";
import Layout from "../../Components/Layout";
import UserMenu from "../../Components/UserMenu";

const UserDashboard = () => {
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="no-padding my-account-wrapper">
          <UserMenu />
          <div className="col-sm-9 col-md-9 no-padding margin-b10">
            <div className="account-dashboard">
              <div className="layout justify-content-between margin-t10 margin-b10">
                <div>
                  <div className="whatsappBlock text-center margin-t20">
                    <label
                      className="toggle-style display-flex align-items-center justify-content-center"
                      htmlFor="toggleStatus"
                    >
                      <div className="inline-block whatsapp-logo">
                        <img
                          alt="whatsapp"
                          src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
                        />
                      </div>
                      <span className="fw500">
                        Get Order Updates on WhatsApp
                      </span>
                      <div className="switch inline-block cursor-pointer">
                        <div className=" block toggleswitch" id="toggleStatus">
                          <span className="block handle" />
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="margin-t20">
                  <button
                    className="btn btn-success fs12 uppercase text-color-white font-bold"
                    style={{
                      backgroundColor: "rgb(61, 176, 166)",
                      letterSpacing: "1.3px",
                      padding: "13px 26px",
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className="order-list">
                <div className="col-md-12 alert alert-warning">
                  You currently have no order in your account.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
