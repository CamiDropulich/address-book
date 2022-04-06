import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import "../css/NewContact.css";

export default function NewContact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [nameC, setNameC] = useState("");
  const [lastNameC, setLastNameC] = useState("");
  const [birthC, setBirthC] = useState("");
  const [typeC, setTypeC] = useState("");
  const [nrC, setNrC] = useState("");

  const [contactData, setContactData] = useState([]);

  const submitContact = () => {
    reset({
      name: "",
      lastName: "",
      birthdate: "",
      typeContact: "",
      contactNr: "",
    });
    db.ref("data").child("contacts").push({
      name: nameC,
      lastName: lastNameC,
      birthdate: birthC,
      contactType: typeC,
      contactNumber: nrC,
      fav: false,
    });
    setNameC("");
    setLastNameC("");
    setBirthC("");
    setTypeC("");
    setNrC("");
    console.log(db.ref("data").child("contacts"));
    console.log(nameC);
  };

  useEffect(() => {
    db.ref("data")
      .child("contacts")
      .on("value", (snapshot) => {
        let newdata = [];
        snapshot.forEach((data) => {
          newdata.push({
            id: data.key,
            data: data.val(),
          });
        });
        setContactData(newdata);
        console.log(contactData);
      });
  }, []);

  return (
    <>
      <div className="container cont-new">
        <div className="row">
          <h4>New Contact</h4>
          <form onSubmit={handleSubmit(submitContact)}>
            <label>Name</label>
            <input
              name="name"
              className="input-name"
              type="text"
              {...register("name", {
                required: { value: true, message: "Required" },
                maxLength: {
                  value: 20,
                  message: "Max 20 characters",
                },
              })}
              value={nameC}
              onChange={(e) => setNameC(e.target.value)}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.name && errors.name.message}
            </span>

            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              {...register("lastName", {
                required: { value: true, message: "Required" },
                maxLength: {
                  value: 30,
                  message: "Max 30 characters",
                },
              })}
              value={lastNameC}
              onChange={(e) => setLastNameC(e.target.value)}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.lastName && errors.lastName.message}
            </span>

            <label>Date of birth</label>
            <input
              type="date"
              name="birthdate"
              {...register("birthdate", {
                required: { value: true, message: "Required" },
              })}
              value={birthC}
              onChange={(e) => setBirthC(e.target.value)}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.birthdate && errors.birthdate.message}
            </span>
            <label>Type of contact</label>
            <select
              name="typeContact"
              {...register("typeContact", {
                required: { value: true, message: "Required" },
              })}
              value={typeC}
              onChange={(e) => setTypeC(e.target.value)}
            >
              <option value=""></option>
              <option value="Mobile">Mobile phone</option>
              <option value="Home">Home phone</option>
              <option value="Email">Email</option>
              <option value="Pager">Pager</option>
            </select>
            <span className="text-danger text-small d-block mb-2">
              {errors.typeContact && errors.typeContact.message}
            </span>
            <label>Contact</label>
            <input
              type="text"
              name="contactNr"
              {...register("contactNr", {
                required: { value: true, message: "Required" },
              })}
              value={nrC}
              onChange={(e) => setNrC(e.target.value)}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.contactNr && errors.contactNr.message}
            </span>
            <button>+</button>
          </form>
        </div>
      </div>
    </>
  );
}
