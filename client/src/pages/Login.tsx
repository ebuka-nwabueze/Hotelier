import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useLoginUser } from "../queryState/auth/authQuery";

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
  const navigate = useNavigate();

  const mutation = useLoginUser()

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate("/tickets");
    }
    if(mutation.isError){
      toast.error(mutation.error.message)
    }
    // eslint-disable-next-line
  }, [mutation.isSuccess, mutation.isError]);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usersData = { email, password };
    mutation.mutate(usersData);
  };

  if (mutation.isLoading) return <Spinner />;

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
            <button className="btn btn-block" type="submit">
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
