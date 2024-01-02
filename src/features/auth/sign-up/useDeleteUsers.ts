import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteManyUsers as deleteManyUsersApi } from "../../../services/apiUsers";
import { toast } from "react-hot-toast";

export function useDeleteUsers() {
  const queryClient = useQueryClient();

  const { mutate: deleteManyUsers, isPending } = useMutation({
    mutationFn: (userIds: string[]) => deleteManyUsersApi(userIds), 
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]});
      toast.success("Users deleted successfully");
    },
    onError: (err) => {
      console.error("Error deleting users", err);
      toast.error("Failed to delete users");
    },
    retry: 3,
  });

  return { deleteManyUsers, isDeleting: isPending };
}
