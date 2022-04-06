import React, { useState, useEffect } from "react";
import "../css/ContactList.css";
import { Link } from "react-router-dom";
import { db } from "../firebase";

export default function () {
  const [contactData, setContactData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("ASC");

  const singleContactRoute = "/contacts/";

  //Obtain snapshot from RealtimeDB
  useEffect(() => {
    db.ref("data")
      .child("contacts")
      .on("value", (snapshot) => {
        let newdata = [];
        snapshot.forEach((data) => {
          newdata.push({
            id: data.key,
            contact: data.val(),
          });
        });
        setContactData(newdata);
        console.log(snapshot.val());
      });
  }, []);

  //Sorting contacts table

  const sortTable = () => {
    if (order === "ASC") {
      const sorted = [...contactData].sort((a, b) => (a > b ? 1 : -1));
      setContactData(sorted);
      setOrder("DESC");
    }
    if (order === "DESC") {
      const sorted = [...contactData].sort((a, b) => (a < b ? 1 : -1));
      setContactData(sorted);
      setOrder("ASC");
    }
  };

  return (
    <>
      <div className="container cont-cont-list">
        <h2>Contact List</h2>
        <div className="row">
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          ></input>

          <table className="table-list table">
            <thead>
              <tr>
                <th onClick={() => sortTable("name")}>Name</th>
                <th onClick={() => sortTable("lastName")}>Last Name</th>
                <th onClick={() => sortTable("birthdate")}>Birth date</th>
                <th onClick={() => sortTable("contactType")}>Type</th>
                <th onClick={() => sortTable("contactNumber")}>Contact</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contactData
                .filter((data) => {
                  if (searchTerm == "") {
                    //data filtering for searchbar, using all fields
                    return data;
                  } else if (
                    data.contact.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    data.contact.lastName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    data.contact.birthdate
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    data.contact.contactNumber
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    data.contact.contactType
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return data;
                  }
                })
                .map((data, index) => {
                  //list of contacts
                  if (data === "") {
                    return <p>No contacts :(</p>;
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
                          <button
                            className="button muted-button"
                            onClick={() => {
                              db.ref("data")
                                .child("contacts")
                                .child(data.id)
                                .remove();
                            }}
                          >
                            x
                          </button>
                        </td>
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
      </div>
    </>
  );
}
