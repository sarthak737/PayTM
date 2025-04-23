import React from "react";

const InputBox = ({
  type = "text",
  label,
  id,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div className="flex flex-col text-left mb-4">
      <label htmlFor={id} className="font-semibold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="border-2 border-gray-300 rounded-sm px-2 py-1"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputBox;
