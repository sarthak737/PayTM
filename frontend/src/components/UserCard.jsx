import React from "react";

const UserCard = ({ name, logo, onClick, uname }) => {
  return (
    <div className="flex justify-between items-center mb-5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 text-center text-white flex justify-center items-center rounded-full bg-gray-800">
          {logo}
        </div>
        <h2>{name}</h2>
        <p className="text-xs opacity-70">({uname})</p>
      </div>
      <button
        className="cursor-pointer text-lg btn bg-black text-white px-2 py-1 rounded-md"
        onClick={onClick}
      >
        Send Money
      </button>
    </div>
  );
};

export default UserCard;
