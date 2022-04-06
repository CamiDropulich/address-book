import React from "react";
import FavouriteList from "../components/FavouriteList";
import "../css/Favourites.css";
import Back from "../assets/statics/volver.png";
import { Link } from "react-router-dom";

export default function Favourites() {
  return (
    <>
      <div>
        <Link to="/contacts">
          <img src={Back} alt="" className="back" />
        </Link>
      </div>
      <div className="container cont-fav">
        <div className="row">
          <h2>Favourite contacts</h2>
        </div>
        <FavouriteList></FavouriteList>
      </div>
    </>
  );
}
