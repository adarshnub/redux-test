import React from 'react'
import Header from './Header';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';

const Profile = () => {
    const user = useSelector(selectUser);
    const bookmarkedItems = useSelector((state) => state.bookmark);
  return (
    <div
    className='mx-auto bg-blue-300 px-5 py-5 h-64 rounded-xl mt-12'
    > This is Dummy Profile
      <div 
    className='text-white font-bold flex flex-col items-start mt-4 px-8 '>
   
       <h1 className=''>email : {user.email}</h1>
      <h1>You have bookmarked {bookmarkedItems.length} quotes </h1>
       <h1>userId : {user.uid}  </h1>
       
    </div>
    </div>
  )
}

export default Profile;