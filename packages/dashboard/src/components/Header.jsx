import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/user";
import { apiCallAddresses } from "../utils/api";
import { deleteUser } from "../utils/localStorage";

const Header = () => {
  const [user] = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignout = () => {
    fetch(apiCallAddresses.auth.signout)
      .then(() => {
        navigate("/");
        deleteUser();
      })
      .catch(console.error);
  };

  return (
    <header className="flex justify-between items-center p-4 shadow bg-white">
      <span className="text-xl font-semibold">
        Welcome, {user ? user.name : "Please sign in!"}
      </span>
      {user ? (
        <button
          onClick={handleSignout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => {
            navigate("/signin");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </button>
      )}
    </header>
  );
};

export default Header;
