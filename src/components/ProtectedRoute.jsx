import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // If no user → redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → allow access
  return children;
}
