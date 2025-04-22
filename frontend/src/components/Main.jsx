import React from "react";
import UserCard from "./UserCard";

const Main = () => {
  return (
    <div className="text-lg p-10">
      <h2 className="mb-6">Your Balance: Bal</h2>
      <h2 className="mb-2">Users:</h2>
      <input
        type="text"
        placeholder="Search Users"
        className="border-1 rounded-md px-2 border-gray-500 w-screen"
      />
      <div className="mt-4">
        <UserCard />
      </div>
    </div>
  );
};

export default Main;
