import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";

const Profile = () => {
  const user = useSelector(selectUser);
  const bookmarkedItems = useSelector((state) => state.bookmark);
  return (
    <div className="mx-auto bg-blue-300 px-5 py-5 h-64 rounded-xl mt-12">
      {" "}
      This is Dummy Profile
      <div className="text-white font-semibold flex flex-row  mt-2 px-5 justify-between ">
        <div
        className="flex flex-col items-start">
          <h1>username: {user.displayName} </h1>
          <h1 className="">email : {user.email}</h1>
          <h1>You have bookmarked {bookmarkedItems.length} quotes </h1>
          <h1>userId:{user.uid} </h1>
        </div>
        <div>
          <img src={user.photoUrl} className="rounded-xl w-52 h-48" />
        </div>
      </div>
      {/* <Link >Logout</Link> */}
    </div>
  );
};

export default Profile;
