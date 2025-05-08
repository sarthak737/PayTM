import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Send from "./components/Send";
import Update from "./components/Update";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute element={<SignIn />} />} />
          <Route
            path="/signup"
            element={<PublicRoute element={<SignUp />} />}
          />
          <Route
            path="/signin"
            element={<PublicRoute element={<SignIn />} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route path="/send" element={<ProtectedRoute element={<Send />} />} />
          <Route
            path="/update"
            element={<ProtectedRoute element={<Update />} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
