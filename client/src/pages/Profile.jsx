import React from 'react';
import {useSelector} from "react-redux";

function Profile() {
  const {currentUser} = useSelector((state) => {
    return state.user;
  });
  return (
    <div className='max-w-lg mx-auto '>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
        className="rounded-full h-24 w-24 cursor-pointer object-cover self-center mt-2"
        src={currentUser.avatar}
        alt="profile_picture" />
        <input type="text" placeholder='username' id="username"
          className="border rounded-lg p-3"/>
        <input type="email" placeholder='email' id="email"
          className="border rounded-lg p-3"/>
        <input type="password" placeholder='password' id="password"
          className="border rounded-lg p-3"/>
        <button className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80'
        >Update</button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}

export default Profile;
