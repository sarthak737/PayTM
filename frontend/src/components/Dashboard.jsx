import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [bal, setBal] = useState(0);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

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

  const navigate = useNavigate();

  return (
    <div>
      <div className="text-xl flex justify-between items-center w-full px-10 py-4 border border-b-1 border-gray-300">
        <h2 className="font-bold">Paytm App</h2>
        <div className="flex justify-center items-center">
          <h2 className="px-2">Hello, {name}</h2>
          <div className="w-8 h-8 text-center text-white flex justify-center items-center rounded-full bg-gray-800">
            {name[0]}
          </div>
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
          />
        </div>
        {
          <div className="mt-4">
            {users.map((el) => (
              <UserCard
                key={el._id}
                name={el.firstName}
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
