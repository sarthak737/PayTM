import React from "react";

const Bottom = ({ text, htext, path }) => {
  return (
    <p className="text-sm font-semibold">
      {text}{" "}
      <a href={path} className="underline">
        {htext}
      </a>
    </p>
  );
};

export default Bottom;
