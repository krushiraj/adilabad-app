import React, { useState, useContext } from "react";
import { apiCallAddresses } from "../utils/api";
import { UserContext } from "../contexts/user";
import { saveUser } from "../utils/localStorage";

const SignInPage = () => {
  const [user, setUser] = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiCallAddresses.auth.signin, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        saveUser(user);
        setUser(user);
      } else {
        // Handle sign-in error
      }
    } catch (error) {
      // Handle network error
    }
  };

  return (
    <div className="flex justify-center items-center">
      {user ? <p>Already signed in. Please continue.</p> : 
      <form
        onSubmit={handleSubmit}
        className="w-1/3 p-6 bg-white rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded"
        >
          Sign In
        </button>
      </form>}
    </div>
  );
};

export default SignInPage;
