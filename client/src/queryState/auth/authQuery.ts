import { useMutation, useQueryClient, UseMutationResult } from "react-query"
import { UserRegisterData, UserResponseData, UserLoginData } from "../../types/types";
import { authLogin, authRegister  } from "./authApi";

export const useLoginUser = (): UseMutationResult<UserResponseData, Error, UserLoginData> => {
  const queryClient = useQueryClient();
  return useMutation(authLogin, {
    onSuccess: (data) => {
      queryClient.setQueryData("user", data); 
    }
  })
}

export const useRegisterUser = (): UseMutationResult<UserResponseData , Error, UserRegisterData> => {
  const queryClient = useQueryClient();
  return useMutation(authRegister, {
    onSuccess: (data) => {
      console.log("register to setqueryData", data)
      queryClient.setQueryData("user", data); 
    }
  })
}