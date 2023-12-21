import { useEffect } from "react";
import { useUser } from "../features/auth/useUser";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Confirm() {
    const navigate = useNavigate();

    const { isLoading, isAuthenticated } = useUser();

    // 2. If there is NO authenticated user, redirect to the /login
    useEffect(
      function () {
        if (isAuthenticated && !isLoading) navigate("/");
      },
      [isAuthenticated, isLoading, navigate]
    );

    // 3. While loading, show a spinner
    if (isLoading) return <Loader />;
    return (
        <div>
            please check your email for verification link
        </div>
    )
}

export default Confirm
