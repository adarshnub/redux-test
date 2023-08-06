import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { login } from "../store/userSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        );
      })

      .catch((err) => {
        alert(err);
      });
  };

  const register = () => {
    if (!name) {
      return alert("Please enter a valid name");
    }
  };

  createUserWithEmailAndPassword(auth, email, password).then((userAuth) => {
    updateProfile(userAuth.user, {
      displayName: name,
      photoURL: profilePic,
    }).then(
      dispatch(
        login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: name,
          photoUrl: profilePic,
        })
      )
    )
    .catch((error) => {
        console.log('user not updated :',error);
    })
  })
  .catch((err) => {
    alert(err);
  })

  return (
    <div className="mt-8 mx-auto w-2/3 sm:w-1/3">
      <h1 className="text-red-600 font-bold text-xl">Login</h1>
      <div className="">
        <form className="flex flex-col gap-5 ">
          {/* <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name "
            type="text"
            className="text-center py-1 rounded-xl"
          />

          <input
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            placeholder="profile picture URL"
            type="text"
            className="text-center py-1 rounded-xl"
          /> */}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="text-center py-1 rounded-xl"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="text-center py-1 rounded-xl"
          />
          <button
            type="submit"
            to="/profile"
            onClick={loginToApp}
            className="bg-red-400 px-4 py-1 rounded-xl w-3/5 font-bold items-center mx-auto"
          >
           <Link to="/"> Sign In</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
