import React from "react";

const UserCard = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 text-center text-white flex justify-center items-center rounded-full bg-gray-800">
          U1
        </div>
        <h2>User 1</h2>
      </div>
      <button className="text-lg btn bg-black text-white px-2 py-1 rounded-md">
        Send Money
      </button>
    </div>
  );
};

export default UserCard;
