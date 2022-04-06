import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import "../css/Favourites.css";

export default function FavouriteList() {
  const [favouriteData, setFavouriteData] = useState([]);
  const singleContactRoute = "/contacts/";

  useEffect(() => {
    db.ref("data")
      .child("contacts")
      .on("value", (snapshot) => {
        let newFavData = [];
        snapshot.forEach((data) => {
          newFavData.push({
            id: data.key,
            contact: data.val(),
          });
        });
        setFavouriteData(newFavData);
        console.log(snapshot.val());
      });
  }, []);
  return (
    <>
      <div className="row row-fav">
        <table className="table-list table ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Birth date</th>
              <th>Type of contact</th>
              <th>Contact</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {favouriteData
              .filter((data) => {
                if (data.contact.fav == true) {
                  console.log(data);
                  return data;
                }
              })
              .map((data, index) => {
                if (data === "") {
                  return <p>No favs :(</p>;
                } else {
                  return (
                    <tr key={index}>
                      <th>
                        <Link to={singleContactRoute + data.id}>
                          {data.contact.name}
                        </Link>
                      </th>
                      <th>
                        <Link to={singleContactRoute + data.id}>
                          {data.contact.lastName}
                        </Link>
                      </th>
                      <th>
                        <Link to={singleContactRoute + data.id}>
                          {data.contact.birthdate}
                        </Link>
                      </th>
                      <th>
                        <Link to={singleContactRoute + data.id}>
                          {data.contact.contactType}
                        </Link>
                      </th>
                      <th>
                        <Link to={singleContactRoute + data.id}>
                          {data.contact.contactNumber}
                        </Link>
                      </th>

                      <td>
                        <input
                          id={index}
                          className="input-star"
                          type="checkbox"
                          defaultChecked={data.contact.fav}
                          onClick={(e) => {
                            db.ref("data")
                              .child("contacts")
                              .child(data.id)
                              .update({ fav: e.target.checked });
                            console.log("HACIENDO CLICK" + e.target.checked);
                          }}
                        />
                        <label className="label-star" htmlFor={index}>
                          ★
                        </label>
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
