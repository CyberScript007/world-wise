import { useNavigate } from "react-router-dom";
import { useAuthenticateContext } from "../contexts/AuthenticateContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthenticateContext();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  if (!isAuthenticated) return;

  return children;
}

export default ProtectedRoute;
