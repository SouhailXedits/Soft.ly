import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signupApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("signed up successfully");
      navigate("/confirm", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("failed to sign up");
    },
  });

  return { signup, isPending };
}
