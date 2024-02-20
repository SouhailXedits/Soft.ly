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
    mutationFn: async ({ userId, value, label }: inputTagProps) => {
      const createdTag = await createTagApi({ user_id: userId, value, label });
      return createdTag; // Return the created tag
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user-tags"],
      });
      queryClient.setQueryData(["created-tag"], data);
      console.log(data); 
      return data; 
    },
    onError: () => {
      toast.error("Invalid tag format! 😢");
    },
    retry: false,
  });

  return { createTag, isPending };
}

