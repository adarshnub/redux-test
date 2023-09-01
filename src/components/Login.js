import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { login } from "../store/userSlice";
import { Link } from "react-router-dom";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [issSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && issSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "You entered an invalid email format";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must contain atleast 4 characters";
    } else if (values.password.length > 12) {
      errors.password = "Password lenght cannot exceed 12 characters";
    }
    return errors;
  };

  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0) {
      const { email, password } = formValues;

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
    }
  };

  return (
    <div className="mt-24 mx-auto w-2/3 sm:w-[20rem] ">
      <div className="bg-blue-500 bg-opacity-80 rounded-2xl min-h-[12rem] flex flex-col justify-center items-center gap-8 text-gray-500 text-xs md:text-lg mx-auto w-full px-4 py-2  mt-6 ">
        <div className="login">
          {/* <pre className="text-white">
            {JSON.stringify(formValues, undefined, 2)}
          </pre> */}
          <h1 className="text-red-600 font-bold text-xl mb-4">Login</h1>
          <form className="flex flex-col gap-5 ">
            <div>
              <input
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                className="text-center py-1 rounded-xl"
              />
              <p className="text-red-600">{formErrors.email}</p>
            </div>

            <div>
              <input
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
                className="text-center py-1 rounded-xl"
              />
              <p className="text-red-600">{formErrors.password}</p>
            </div>

            <button
              type="submit"
              onClick={loginToApp}
              className="bg-red-400 px-4 py-1 rounded-xl w-3/5 font-bold items-center mx-auto hover:bg-red-600 hover:text-white"
            >
              <Link to="/"> Login</Link>
            </button>
          </form>

          <p className="text-white mt-3 mb-2">
            Not a member?{" "}
            <button>
              <Link
                className="login__register text-red-600 font-semibold border px-3 py-1 rounded-lg "
                to="/register"
              >
                Register Now
              </Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
