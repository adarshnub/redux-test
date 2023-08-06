import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../store/userSlice";

const Navbar = () => {
  const user = useSelector(selectUser);
  const bookmarkedItems = useSelector((state) => state.bookmark);

  return (
    <div>
      <nav className="text-white py-4 md:text-lg">
        <ul className="flex justify-between font-bold  ">
          <li className=" hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 px-4 py-1 rounded-lg opacity-60 ">
            <Link to="/">Home</Link>
          </li>
          { 
            user ? (
              <>
              <li className=" hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 px-4 py-1 rounded-lg opacity-60 ">
            <Link to="/bookmark">Bookmarks ({bookmarkedItems.length})</Link>
          </li>
          <li className=" hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 px-4 py-1 rounded-lg opacity-60 ">
            <Link to="/profile">Profile </Link>
          </li>
              </>
            ) : (
              <li className="bg-red-400 px-4 py-1 rounded-xl button1 text-white font-semibold">
            <Link to="/login">Login</Link>
          </li>
            )
          }
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
