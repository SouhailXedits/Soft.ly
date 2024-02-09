import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (user: any) => {
      // console.log(user)
      const token = user?.login.token;
      const User = user?.login.user;
      queryClient.setQueryData(["user"], User);
      localStorage.setItem("token", token);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      // console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
    retry: false,
  });
  

  return { login, isPending };
}

