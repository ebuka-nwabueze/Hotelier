import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Spinner from "../components/Spinner";
import { login, reset, selectAuth } from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom"

export interface FormData {
  email: string;
  password: string;
}

function Login() {
  const [formData, setformData] = useState<FormData>({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  
  const {user,isError,isSuccess,isLoading,message} = useAppSelector(selectAuth)

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate("/tickets")
    }
    dispatch(reset());
  }, [isError, isSuccess,message, user, dispatch])

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const usersData = { email, password };
    dispatch(login(usersData));
  }
  if (isLoading) return <Spinner/>

  return (
    <div className="form-content">
      <section className="form-content-heading">
        <h1>Login</h1>
        <p>Login into your Account</p>
      </section>

      <section className="form-content-main">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={inputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={inputChange}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">Login</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
