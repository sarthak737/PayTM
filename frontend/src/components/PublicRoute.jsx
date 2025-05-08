import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ element }) => {
  const { isValid } = useAuth();
  return isValid ? <Navigate to="/dashboard" /> : element;
};
export default PublicRoute;
