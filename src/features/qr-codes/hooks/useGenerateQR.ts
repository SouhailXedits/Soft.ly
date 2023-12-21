import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { GenerateQR } from "../../../services/apiQr";

interface GenerateQRParams {
  url: string;
  title: string;
}

export function useGenerateQR() {
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  const { mutate: generateQr, isPending } = useMutation({
    mutationFn: (params: GenerateQRParams): Promise<string | undefined> =>
      GenerateQR(params.url, params.title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["qr-codes"],
      });
      navigate("/qrcodes", { replace: true });
      toast.success("Qr code Created Successfully!");
    },
    onError: (err: Error) => {
      console.error("ERROR", err);
      toast.error("Failed to shorten URL");
    },
    retry: 2,
  });

  return { generateQr, isPending };
}
