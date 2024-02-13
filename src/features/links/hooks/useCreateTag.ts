import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createTag as createTagApi } from "@/services/apiTag";

interface inputTagProps {
  userId: string;
  value: string;
  label: string;
}
export function useCreateTag() {
  const queryClient = useQueryClient();

  const { mutate: createTag, isPending } = useMutation({
    mutationFn: ({ userId, value, label }: inputTagProps) =>
      createTagApi({ user_id: userId, value, label }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tags"],
      });
      // toast.success("URL Shortened Successfully!");
    },
    onError: () => {
      toast.error("Invalid tag format  ! 😢");
    },
    retry: false,
  });
  return { createTag, isPending };
}
