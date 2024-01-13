import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
<<<<<<< HEAD
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
=======
      <h1 className="text-xl text-center font-semibold my-7">Sign Up</h1>
>>>>>>> d6781ef146f45f0b75d3656a336d83f2a3568ade
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase
          hover:opacity-90 disabled:opacity-80"
        >
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
