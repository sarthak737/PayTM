import React, { useEffect, useState } from "react";
import Heading from "./Heading.jsx";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Send = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const to = searchParams.get("to");
  const [amt, setAmt] = useState(0);
  const [err, setErr] = useState("");
  const [suc, setSuc] = useState("");

  const navigate = useNavigate();

  const sendMoney = async () => {
    try {
      const r = await axios.post(
        "http://localhost:3001/api/v1/account/transfer",
        { to, amount: amt },
        { withCredentials: true }
      );
      setSuc("Transaction completed");
      setAmt(0);
      setTimeout(() => {
        setSuc("");
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setErr("Transaction failed ");
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#aaa] text-center">
      <div className="bg-[#fff] p-6 rounded-md w-[40%] text-[#222]">
        <Heading text="Send Money" />
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 text-center text-white flex justify-center items-center rounded-full bg-green-500">
            {to[0].toUpperCase()}
          </div>
          <h2>{to}</h2>
        </div>
        <div>
          <h2 className="font-semibold text-left mb-2">Amount(in Rs.)</h2>
          <input
            type="text"
            placeholder="Enter amount"
            className="border-2 border-gray-300 rounded-md w-full mb-2 px-2 py-1"
            onChange={(e) => setAmt(e.target.value)}
            value={amt}
          />
          <p className="mb-2 text-green-700 text-sm">{suc}</p>
          <p className="mb-2 text-red-700 text-sm">{err}</p>
          <button
            className="cursor-pointer w-full py-2 bg-green-500 font-semibold text-white rounded-md"
            onClick={sendMoney}
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Send;
