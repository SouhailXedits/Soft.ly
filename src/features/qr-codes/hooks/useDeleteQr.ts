import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteLink } from "../../../services/apiQr";

export function useDeleteQR() {
  const queryClient = useQueryClient();

  const { mutate: deleteQr, isPending } = useMutation({
    mutationFn: (id: string): Promise<void> => deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["urls"],
      });
      toast.success("Qr code deleted Successfully!");
    },
    onError: (err: Error) => {
      console.error("ERROR", err);
      toast.error("Failed to delte Qer code");
    },
    retry: 2,
  });

  return { deleteQr, isPending };
}
