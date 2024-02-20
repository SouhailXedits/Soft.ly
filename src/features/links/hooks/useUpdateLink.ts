import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  updateUrl  as updateUrlApi } from "../../../services/apiLinks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateUrlInput } from "../../../types";

// interface getShorterUrlParams {
//   url: string;
//   title: string;
//   userId: string;
//   back_half: string;
// }
export function useUpdateLink() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateUrl, isPending } = useMutation({
    mutationFn: ({ id, title, back_half, tags }: updateUrlInput) =>
      updateUrlApi({ id, title, back_half, tags }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["urls"],
      });
      navigate("/links", { replace: true });
      toast.success("URL updated Successfully!");
    },
    onError: () => {
      toast.error("error updating the url ! 😢");
    },
    retry: false,
  });
  return { updateUrl, isPending };
}
