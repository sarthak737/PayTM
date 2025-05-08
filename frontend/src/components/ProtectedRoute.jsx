import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isValid } = useAuth();
  return isValid ? element : <Navigate to="/signin" />;
};
export default ProtectedRoute;
