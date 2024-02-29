import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteLink } from "../../../services/apiQr";

export function useDeleteLink() {
  const queryClient = useQueryClient();

  const { mutate: deletLink, isPending } = useMutation({
    mutationFn: (id: string): Promise<void> => deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["urls"],
      });
      toast.success("Link deleted Successfully!");
    },
    onError: (err: Error) => {
      console.error("ERROR", err);
      toast.error("Failed to Delete link");
    },
    retry: false,
  });

  return { deletLink, isPending };
}
