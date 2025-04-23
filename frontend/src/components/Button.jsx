import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="cursor-pointer text-sm font-semibold btn bg-black text-white rounded-md w-full py-2 mb-4"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
