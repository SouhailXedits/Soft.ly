import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteQrCode } from "../../../services/apiQr";

export function useDeleteQR() {
  const queryClient = useQueryClient();

  const { mutate: deleteQr, isPending } = useMutation({
    mutationFn: (id: number): Promise<string | undefined> => deleteQrCode(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["qr-codes"],
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
