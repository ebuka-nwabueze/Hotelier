import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { register, reset, selectAuth } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

export interface FormData {
  name: string;
  email: string;
  password: string; 
  password2: string
}

function Register() {
  const [formData, setformData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = formData;
  const {user,isError,isSuccess,isLoading,message} = useAppSelector(selectAuth)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const usersData = { name, email, password };
      dispatch(register(usersData));
    }
  }

  if(isLoading) return <Spinner/>

  return (
    <div className="form-content">
      <section className="form-content-heading">
        <h1>Register</h1>
        <p>Create a new Account</p>
      </section>

      <section className="form-content-main">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={inputChange}
              required
            />
          </div>
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
            <label htmlFor="password2">Confirm Password:</label>
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Confirm password"
              value={password2}
              onChange={inputChange}
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">Register</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Register;
