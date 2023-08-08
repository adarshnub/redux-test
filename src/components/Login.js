import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { login } from "../store/userSlice";
import { Link } from "react-router-dom";

const Login = () => {
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

  return (
    <div className="mt-8 mx-auto w-2/3 sm:w-[20rem]">
      <div>
        <div className="login">
          <h1 className="text-red-600 font-bold text-xl mb-4">Login</h1>
          <form className="flex flex-col gap-5 ">
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
              className="bg-red-400 px-4 py-1 rounded-xl w-3/5 font-bold items-center mx-auto hover:bg-red-600 hover:text-white"
            >
              <Link to="/"> Login</Link>
            </button>
          </form>

          <p className="text-white mt-3">
            Not a member?{" "}
            <Link
              className="login__register text-red-600 font-semibold border px-3 py-1 rounded-lg "
              to="/register"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
