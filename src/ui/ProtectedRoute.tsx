import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../features/auth/useUser";
import Loader from "./Loader";


function ProtectedRoute({ children }: {children: React.ReactNode}) {
  const navigate = useNavigate()
  //const queryClient = useQueryClient();
  // const user = queryClient.getQueryData(["user"]);
  //console.log(user)

  //const token = localStorage.getItem('token')
  const { isLoading  , isAuthenticated } = useUser();
 
 // const isAuthenticated = token !== null
  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/login");
    },
    [isAuthenticated, navigate]
  );

  // // 3. While loading, show a spinner
  if (isLoading)
    return (

        <Loader />

    );
  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
