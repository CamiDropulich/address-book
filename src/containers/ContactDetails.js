import React from "react";
import SingleContact from "../components/SingleContact";
import "../css/ContactDetails.css";
import Back from "../assets/statics/volver.png";
import { Link } from "react-router-dom";

export default function () {
  return (
    <>
      <div>
        <Link to="/contacts">
          <img src={Back} alt="" className="back" />
        </Link>
      </div>
      <div className="container cont-detail">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 cont-card">
            <h2>Contact Details</h2>
            <div className="container">
              <SingleContact></SingleContact>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
