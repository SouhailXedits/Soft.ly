import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../features/auth/useUser";
import Loader from "./Loader";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();
  

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, 1000);

    return () => clearTimeout(redirectTimeout);
  }, [isAuthenticated, navigate]);
  if (isLoading) return <Loader />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
