import React, { useEffect } from "react";
import Quote from "./Quote";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Login from "./Login";
import Header from "./Header";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div>
     
      {user && 
        <>
        <Header />
        <h1
        className="text-white font-semibold
        flex mt-6 ml-4 font-"
        >Welcome, {user.email.split("@")[0]}
        </h1>
        </>
       }
      <Quote />
    </div>
  );
};

export default Home;
