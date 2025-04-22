import React from "react";

const Header = () => {
  return (
    <div className="text-xl flex justify-between items-center w-full px-10 py-4 border border-b-1 border-gray-300">
      <h2 className="font-bold">Paytm App</h2>
      <div className="flex justify-center items-center">
        <h2 className="px-2">Hello, User</h2>
        <div className="w-8 h-8 text-center text-white flex justify-center items-center rounded-full bg-gray-800">
          U
        </div>
      </div>
    </div>
  );
};

export default Header;
