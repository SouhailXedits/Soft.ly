import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getShorterUrl } from "../../../services/apiLinks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

interface getShorterUrlParams {
  url: string;
  title: string;
}
export function useShorterUrl() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: shortenUrl, isPending } = useMutation({
    mutationFn: (params: getShorterUrlParams): Promise<string | undefined> =>
      getShorterUrl(params.url, params.title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["urls"],
      });
      navigate("/links", { replace: true });
      toast.success("URL Shortened Successfully!");
    },
    onError: (err: string) => {
      console.log("ERROR", err);
      toast.error("Failed to shorten URL");
    },
    retry: 3,
  });
  return { shortenUrl, isPending };
}
