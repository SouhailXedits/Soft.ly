import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getShorterUrl } from "../../../services/apiLinks";
import { getShorterUrlParams } from "../../../types/links";

// interface GenerateQRParams {
//   url: string;
//   title: string;
// }

// interface getShorterUrlParams {
//   url: string;
//   title: string;
//   userId: string;
//   back_half?: string;
// }

export function useGenerateQR() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: generateQr, isPending } = useMutation({
    mutationFn: ({ url, title, userId, back_half }: getShorterUrlParams) =>
      getShorterUrl({ longUrl: url, title, userId, back_half, tags: [] }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["urls"],
      });
      navigate("/qrcodes", { replace: true });
      toast.success("Qr code Created Successfully!");
    },
    onError: (err: Error) => {
      console.error("ERROR", err);
      toast.error("Failed to shorten URL");
    },
    retry: false,
  });

  return { generateQr, isPending };
}
