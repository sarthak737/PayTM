import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const user = await axios.get("http://localhost:3001/api/v1/user/info", {
        withCredentials: true,
      });
      if (user) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    getData();
  }, []);
  return (
    <AuthContext.Provider value={{ isValid, setIsValid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
