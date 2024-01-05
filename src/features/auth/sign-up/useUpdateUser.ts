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
    onSuccess: () => {
      toast.success("User information updated successfully");

      navigate("/users", { replace: true });
      queryClient.invalidateQueries({queryKey: ["users"]})
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed to update user information");
    },
    retry: false,
  });

  return { updateUser, isPending };
}
