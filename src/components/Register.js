import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { login } from "../store/userSlice";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const register = () => {
    if (!name) {
      return alert("Please enter a valid name");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: name,
          photoURL: profilePic,
        })
          .then(
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
            console.log("user not updated :", error);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="mt-8 mx-auto w-2/3 sm:w-[20rem]">
      <div className="register">
        <h1 className="text-red-600 font-bold text-xl mb-4">Register</h1>
        <form className="flex flex-col gap-5 ">
          <input
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
          />

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
            onClick={register}
            className="bg-red-400 px-4 py-1 rounded-xl w-3/5 font-bold items-center mx-auto hover:bg-red-600 hover:text-white"
          >
            <Link to="/"> Register </Link>
          </button>
        </form>

        <p className="text-white mt-2">
          Already a member?{" "}
          <Link
            className="login__register text-red-600 font-semibold border px-3 py-1 rounded-lg"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
