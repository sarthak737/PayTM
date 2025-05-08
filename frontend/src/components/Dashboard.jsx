import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { setIsValid } = useAuth();
  const [bal, setBal] = useState(0);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [showD, setShowD] = useState(false);
  const [fil, setFil] = useState("");

  useEffect(() => {
    const getBal = async () => {
      const b = await axios.get(
        "http://localhost:3001/api/v1/account/balance",
        { withCredentials: true }
      );
      setBal(b.data.balance);
    };
    getBal();

    const getInfo = async () => {
      const b = await axios.get("http://localhost:3001/api/v1/user/info", {
        withCredentials: true,
      });
      setName(b.data.user.firstName);
    };
    getInfo();

    const getUsers = async () => {
      const b = await axios.get("http://localhost:3001/api/v1/user/users", {
        withCredentials: true,
      });
      setUsers(b.data.users);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const filUsers = async () => {
      const fu = await axios.get(
        `http://localhost:3001/api/v1/user/bulk?f=${fil}`,
        { withCredentials: true }
      );
      setUsers(fu.data.users);
    };

    filUsers();
  }, [fil]);

  const handleLogout = async () => {
    const r = await axios.post(
      "http://localhost:3001/api/v1/user/logout",
      {},
      { withCredentials: true }
    );
    setIsValid(false);
    navigate("/signin");
  };

  const handleEdit = async () => {
    navigate("/update");
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="text-xl flex justify-between items-center w-full px-10 py-4 border border-b-1 border-gray-300">
        <h2 className="font-bold">Paytm App</h2>
        <div className="flex justify-center items-center relative">
          <h2 className="px-2">Hello, {name}</h2>
          <button
            className="cursor-pointer w-8 h-8 text-center text-white flex justify-center items-center rounded-full bg-gray-800"
            onClick={() => setShowD((prev) => !prev)}
          >
            {name[0]}
          </button>
          {showD && (
            <div className="absolute top-8 rounded-md text-sm px-2 py-1 right-0 flex flex-col bg-gray-200 gap-2 font-semibold">
              <button
                href="#"
                className="cursor-pointer underline"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                href="#"
                className="cursor-pointer underline"
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="text-lg p-10">
        <h2 className="mb-6">Your Balance: {bal}</h2>
        <h2 className="mb-2">Users:</h2>
        <div className="flex justify-around items-center">
          <input
            type="text"
            placeholder="Search Users"
            className="border-1 rounded-md px-2 border-gray-500 w-screen"
            onChange={(e) => setFil(e.target.value)}
          />
        </div>
        {
          <div className="mt-4">
            {users.map((el) => (
              <UserCard
                key={el._id}
                name={el.firstName}
                uname={el.username}
                logo={el.firstName[0]}
                onClick={() => {
                  console.log(el.username);
                  navigate(`/send?to=${el.username}`);
                }}
              />
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Dashboard;
