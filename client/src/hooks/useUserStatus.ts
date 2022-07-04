import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UserResponseData } from "../types/types";
import { getUserData } from "../userStorage";

type User = UserResponseData | null;

type UserStatus = {
  authLoading: boolean;
  loggedIn: boolean;
  user: User;
  clearUser: () => void;
};

export function useUserStatus(): UserStatus {
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [loggedIn, setloggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);
  const queryClient = useQueryClient();

  // This checks the local storage and returns the value saved, then setting the 
  // user variable which will then be saved into the react query cache
  const { data } = useQuery<UserResponseData | null>("user", async () => {
    const localUser = localStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : null;
  });
  // const { data } = useQuery<UserResponseData | null>("user", getUserData);

  // once the user signs out, it also clears the user info 
  //in localStorage and react query cache
  const clearUser = () => {
    localStorage.removeItem("user");
    queryClient.setQueryData("user", null);
    queryClient.removeQueries(["ticket", "user", "tickets"])
    queryClient.invalidateQueries()
  };

  useEffect(() => {
    if (data) {
      setloggedIn(true);
      setUser(data);
      console.log(data);
    } else {
      setloggedIn(false);
    }
    setAuthLoading(false);
  }, [data]);

  return { authLoading, loggedIn, user, clearUser };
}
