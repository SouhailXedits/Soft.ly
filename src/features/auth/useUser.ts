import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";


export function useUser() {
  const { isLoading, data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  if (error) {
    // Handle the error (e.g., log it, show an error message, etc.)
    console.error("Error fetching user data:", error);

    // Return a default user object or handle this case as appropriate
    return {
      isLoading: false,
      user: null,
      role: undefined,
      isAuthenticated: false,
    };
  }

  return {
    isLoading,
    user,
    role: user?.role,
    isAuthenticated: user?.role === "admin" || user?.role === "user",
  };
}
