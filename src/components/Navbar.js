import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../store/userSlice";
import Header from "./Header";

import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const user = useSelector(selectUser);
  const bookmarkedItems = useSelector((state) => state.bookmark);

  const [nav, setNav] = useState(false);
  const handleClick = () => {
    setNav(!nav);
  };

  return (
    <div>
      <nav className="text-white py-4 md:text-lg">
        <ul className="flex justify-between font-bold  ">
          <li className=" hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 px-4 py-1 rounded-lg opacity-60 ">
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <div className="flex items-center">
              {/* //large-screens */}
              <li className="md:hidden hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 px-4 py-1 rounded-lg opacity-60 ">
                  <Link to="/profile">
                    <img
                      src={user.photoUrl}
                      className="rounded-full w-12 h-12"
                    />
                  </Link>
                </li>
              <div className=" hidden md:flex">
                <li className=" hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 px-4 py-1 rounded-lg opacity-60 ">
                  <Link to="/bookmark">
                    Bookmarks ({bookmarkedItems.length})
                  </Link>
                </li>
                <li className="display hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 px-4 py-1 rounded-lg opacity-60 ">
                  <Link to="/profile">
                    <img
                      src={user.photoUrl}
                      className="rounded-full w-12 h-12"
                    />
                  </Link>
                </li>
                <li>
                  <Header />
                </li>
                
              </div>
              {/* // large screen ends.... */}
              <div
                onClick={handleClick}
                className="md:hidden z-50 cursor-pointer"
              >
                {!nav ? <FaBars /> : <FaTimes />}
              </div>

              {/*Mobile menu*/}
              <ul
                className={
                  !nav
                    ? "hidden"
                    : "absolute  top-0 right-0 w-1/3 h-screen z-20 bg-[#8279ca] bg-opacity-40 flex flex-col pt-24 items-end sm:mr-[-140px] sm:hover:mr-[10px] duration-300 md:hidden pr-4"
                }
              >
                <li className="py-4 text-md hover:font-semibold hover:text-purple-500">
                  <Link to="/profile">Profile </Link>
                </li>
                <li className="py-4 text-md hover:font-semibold hover:text-purple-500">
                  <Link to="/bookmark">
                    Bookmarks ({bookmarkedItems.length})
                  </Link>
                </li>
                <li className="py-4 text-md hover:font-semibold hover:text-purple-500">
                  <Header />
                </li>
              </ul>
            </div>
          ) : (
            <li className="bg-red-400 px-4 py-1 rounded-xl button1 text-white font-semibold hover:bg-red-600 hover:font-bold">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
