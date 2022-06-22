import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuth } from '../features/auth/authSlice';

type AuthStatus = {
  authLoading: boolean;
  loggedIn: boolean
}

export function useAuthStatus (): AuthStatus {
  const [authLoading, setAuthLoading] = useState<boolean>(true)
  const [loggedIn, setloggedIn] = useState<boolean>(false)

  const {user} = useAppSelector(selectAuth)

  useEffect(() => {
    if(user){
      setloggedIn(true)
    }else{
      setloggedIn(false)
    }
    setAuthLoading(false)
  }, [user])
  return {authLoading,loggedIn}
}

