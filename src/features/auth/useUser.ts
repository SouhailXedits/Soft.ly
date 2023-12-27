import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";


export function useUser() {
  const { isLoading, data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  if (error) {
    console.error("Error fetching user data:", error);

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
