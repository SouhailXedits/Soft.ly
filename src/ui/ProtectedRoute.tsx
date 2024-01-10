import { useNavigate } from "react-router-dom";
import { useUser } from "../features/auth/useUser";
import Loader from "./Loader";


function ProtectedRoute({ children }: {children: React.ReactNode}) {
  const navigate = useNavigate()
  
  const { isLoading  , isAuthenticated } = useUser();
  if (isLoading)
    return (

        <Loader />

    );
  if (!isAuthenticated) navigate("/login");
  
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
