import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "@/services/apiUsers"; // Replace with the actual API function for updating a user
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (userData: {
      id: string;
      password?: string;
      role?: string;
      shortsLimits?: string;
      email?: string;
    }) => updateUserApi(userData),
    onSuccess: (updatedUser: any) => {
      // Assuming your API returns the updated user
      queryClient.setQueryData(["user"], updatedUser);

      // Display a success toast
      toast.success("User information updated successfully");

      // Redirect to the home page or the user's profile page
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed to update user information");
    },
    retry: false,
  });

  return { updateUser, isPending };
}
