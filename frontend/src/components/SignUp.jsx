import { useState } from "react";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import InputBox from "./InputBox";
import Button from "./Button";
import Bottom from "./Bottom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [uname, setUname] = useState("");
  const [fname, setFname] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const r = await axios.post(
        "http://localhost:3001/api/v1/user/signup",
        {
          username: uname,
          firstName: fname,
          password: pass,
        },
        { withCredentials: true }
      );
      console.log(r);
      navigate("/dashboard");
    } catch (err) {
      setErr("Error User Create");
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#aaa] text-center">
      <div className="bg-[#fff] p-6 rounded-md w-[40%] text-[#222]">
        <Heading text="Sign Up" />
        <SubHeading text="Enter your information to create an account" />
        <InputBox
          label="Username"
          id="username"
          placeholder="john37"
          onChange={(e) => setUname(e.target.value)}
          value={uname}
        />
        <InputBox
          label="First Name"
          id="firstname"
          placeholder="John"
          onChange={(e) => setFname(e.target.value)}
          value={fname}
        />
        <InputBox
          label="Password"
          type="password"
          id="password"
          placeholder="********"
          onChange={(e) => setPass(e.target.value)}
          value={pass}
        />
        <Button text="Sign Up" onClick={handleSignUp} />
        <p className="text-sm text-red-900">{err}</p>
        <Bottom text="Alreay have an account?" htext="Login" path="/signin" />
      </div>
    </div>
  );
};

export default SignUp;
