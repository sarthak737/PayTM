import React from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import InputBox from "./InputBox";
import Button from "./Button";
import Bottom from "./Bottom";

const SignUp = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#aaa] text-center">
      <div className="bg-[#fff] p-6 rounded-md w-[40%] text-[#222]">
        <Heading text="Sign Up" />
        <SubHeading text="Enter your information to create an account" />
        <InputBox label="Username" id="username" placeholder="john37" />
        <InputBox label="First Name" id="firstname" placeholder="John" />
        <InputBox label="Password" id="password" placeholder="********" />
        <Button text="Sign Up" />
        <Bottom text="Alreay have an account?" htext="Login" path="/signin" />
      </div>
    </div>
  );
};

export default SignUp;
