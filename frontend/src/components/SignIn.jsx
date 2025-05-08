import { useState } from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import InputBox from "./InputBox";
import Button from "./Button";
import Bottom from "./Bottom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsValid } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/v1/user/signin",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      setIsValid(true);
      navigate("/dashboard");
    } catch (err) {
      setError("Wrong Credentials");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#aaa] text-center">
      <div className="bg-[#fff] p-6 rounded-md w-[40%] text-[#222]">
        {error && (
          <div className="bg-red-300 border-1 border-red-600 py-4 rounded-md opacity-70 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}
        <Heading text="Sign In" />
        <SubHeading
          text="
          Enter your credentials to access your account"
        />
        <InputBox
          label="Username"
          id="username"
          placeholder="john37"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <InputBox
          label="Password"
          id="password"
          type="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button text="Sign In" onClick={handleSignIn} />
        <Bottom text="Don't have an account?" htext="Sign Up" path="/signup" />
      </div>
    </div>
  );
};

export default SignIn;
