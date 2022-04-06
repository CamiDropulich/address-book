import React from "react";
import "../css/Home.css";
import Auth from "../components/Auth";

export default function () {
  return (
    <div className="home">
      <div className="container cont-login">
        <div className="row row-login">
          <div className="login-card">
            <Auth></Auth>
          </div>
        </div>
      </div>
    </div>
  );
}
