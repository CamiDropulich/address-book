import React, { useState } from "react";
import ContactList from "../components/ContactList";
import NewContact from "../components/NewContact";
import "../css/ContactList.css";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import Back from "../assets/statics/volver.png";
import { getAuth, signOut } from "firebase/auth";

export default function () {
  const [contacts, setContacts] = useState([]);
  const auth = getAuth();
  const logout = () => {
    signOut(auth);
  };

  //Add new contact

  const addContact = (contact) => {
    contact.id = uuidv4();
    setContacts([...contacts, contact]);
  };

  //Delete contact

  const deleteContact = (id) => {
    console.log(id);
    const filterArray = contacts.filter((contact) => contact.id !== id);

    setContacts(filterArray);
  };

  return (
    <>
      <div className="back-out">
        <Link to="/" onClick={logout()}>
          <img src={Back} alt="" className="back" /> Logout
        </Link>
      </div>
      <div className="container cont-contacts">
        <div className="row">
          <div className="col-md-9">
            <div className="container">
              <ContactList
                contacts={contacts}
                deleteContact={deleteContact}
              ></ContactList>
            </div>
          </div>
          <div className="col-md-3">
            <NewContact addContact={addContact}></NewContact>

            <Link to="/contacts/favourites">
              <button className="btn-seeF">See Favourites </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
