import { Link } from 'react-router-dom'
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {useNavigate} from "react-router-dom"
import { reset, selectAuth, logout} from "../features/auth/authSlice";
import e from 'express';


const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {user,isError,isSuccess,isLoading,message} = useAppSelector(selectAuth)
  const onLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(logout())
    dispatch(reset())
    navigate("/login")
  }

  return (
    <nav className="header">
      <div className="navbar">
        <div className="brand-nav">Hotelier</div>
        <div className="right-nav">
          <ul>
            <li><Link to="/login">Login</Link> </li>
            <li><Link to="/register">Register</Link> </li>
            <li><button onClick={onLogout}>Logout</button>  </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
