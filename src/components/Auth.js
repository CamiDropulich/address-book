import React, { useState, useEffect } from "react";
import "../css/Home.css";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";

export default function Auth(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLogeado, setUserLogeado] = useState("");
  const [userDatum, setUserDatum] = useState("");

  //auth from firebase
  const auth = getAuth();

  //logout function
  const logout = () => {
    signOut(auth);
    setUserLogeado("");
    setUserDatum("");
  };

  // register a new account and login

  const onSubmit = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogeado(user.email);
        setUserDatum(user.metadata.creationTime);
        console.log(userLogeado + userDatum);
      }
    });
  };

  // login with existent account
  const previousUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }

    onAuthStateChanged(auth, (user) => {
      //obtaining session of lugged user
      if (user) {
        setUserLogeado(user.email);
        setUserDatum(user.metadata.creationTime);
      }
    });
  };

  //token to Local Storage
  useEffect(() => {
    localStorage.setItem("x-token", JSON.stringify(userLogeado + userDatum));
    console.log(userLogeado + userDatum);
  }, [userDatum]);

  //Form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="div-login">
      <form onSubmit={handleSubmit(onSubmit)}>
        {!userLogeado && (
          <>
            <label htmlFor="email">Email address</label>
            <input
              name="email"
              className="input-email"
              type="email"
              id="email"
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[a-z0-9.%+-]+@[a-z0-9.%+-]+\.[a-z]{2,4}$/,
                  message: "Invalid email",
                },
              })}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <span className="text-danger text-small d-block mb-2">
              {errors.email && errors.email.message}
            </span>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              {...register("password", {
                required: "Required",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?~+-=|]).{8,32}$/,
                  message:
                    "8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special digit",
                },
              })}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <span className="text-danger text-small d-block mb-2">
              {errors.password && errors.password.message}
            </span>
            <button>New User</button>
          </>
        )}
        {userLogeado && (
          <>
            <Link to="/contacts">
              <button>Go in!</button>
            </Link>
            <button className="btn-out" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </form>

      {!userLogeado && (
        <>
          <div className="btn-login">
            <button onClick={previousUser}>Login</button>
          </div>
        </>
      )}
    </div>
  );
}
