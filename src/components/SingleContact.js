import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";
import "../css/ContactDetails.css";
import Swal from "sweetalert2";

export default function SingleContact() {
  const [contactData, setContactData] = useState([]);
  const [nameC, setNameC] = useState("");
  const [lastNameC, setLastNameC] = useState("");
  const [birthC, setBirthC] = useState("");
  const [typeC, setTypeC] = useState("");
  const [nrC, setNrC] = useState("");

  const location = useLocation();

  const userEdit = location.pathname.slice(10); //retrieving user ID

  useEffect(() => {
    db.ref("data")
      .child("contacts")
      .on("value", (snapshot) => {
        //snapshot from RealtimeDB
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

  useEffect(() => {
    {
      contactData.filter((data) => {
        //Obtaining data for specific selected contact
        if (data.id == userEdit) {
          setNameC(data.contact.name);
          setLastNameC(data.contact.lastName);
          setBirthC(data.contact.birthdate);
          setTypeC(data.contact.contactType);
          setNrC(data.contact.contactNumber);

          return data;
        }
      });
    }
  }, [contactData]);

  return (
    <>
      <div className="row">
        {contactData
          .filter((data) => {
            if (data.id == userEdit) {
              console.log(data.contact.name + "tetaa");
              return data;
            }
          })
          .map((data, index) => {
            return (
              <div className="each-contact" key={index}>
                <h5>Name</h5>
                <input
                  type="text"
                  defaultValue={data.contact.name}
                  onChange={(e) => setNameC(e.target.value)}
                />
                <h5>Last Name</h5>
                <input
                  type="text"
                  defaultValue={data.contact.lastName}
                  onChange={(e) => setLastNameC(e.target.value)}
                />
                <h5>Birthdate</h5>
                <input
                  type="date"
                  defaultValue={data.contact.birthdate}
                  onChange={(e) => setBirthC(e.target.value)}
                />
                <h5>Type of contact</h5>
                <select
                  name="typeContact"
                  defaultValue={data.contact.contactType}
                  onChange={(e) => setTypeC(e.target.value)}
                >
                  <option value="Mobile">Mobile phone</option>
                  <option value="Home">Home phone</option>
                  <option value="Email">Email</option>
                  <option value="Pager">Pager</option>
                </select>
                <h5>Contact</h5>
                <input
                  type="text"
                  defaultValue={data.contact.contactNumber}
                  onChange={(e) => setNrC(e.target.value)}
                />

                <button
                  className="button btn-save"
                  onClick={() => {
                    db.ref("data").child("contacts").child(data.id).update({
                      //updating data
                      name: nameC,
                      lastName: lastNameC,
                      birthdate: birthC,
                      contactType: typeC,
                      contactNumber: nrC,
                    });
                    Swal.fire({
                      position: "top-end",
                      iconColor: "#238ccd",
                      color: "#494949",
                      icon: "success",
                      title: "Saved",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }}
                >
                  Save
                </button>
                <Link to="/contacts">
                  <button
                    className="button"
                    onClick={() => {
                      Swal.fire({
                        position: "top-end",
                        iconColor: "#238ccd",
                        color: "#494949",
                        icon: "success",
                        title: "Deleted",
                        showConfirmButton: false,
                        timer: 2000,
                      });
                      db.ref("data").child("contacts").child(data.id).remove(); //delete contact
                    }}
                  >
                    X
                  </button>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}
