import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../../services/apiAuth";
import { toast } from "react-hot-toast";



export function useSignUp() {

  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signupApi({ email, password }),
    onSuccess: () => {
      toast.success('registered succefully');
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Cannot register user");
    },
  });

  return { signup, isPending };
}





