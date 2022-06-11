import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { reset, selectAuth, logout } from "../features/auth/authSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import "./Navbar/navbar.css";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState<boolean>(false);
  const showSideBar = () => setSidebar(!sidebar);

  const { user } = useAppSelector(selectAuth);

  const onLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(logout());
    dispatch(reset());
    setSidebar(!sidebar)
    navigate("/login");
  };

  return (
    <>
      <nav className="header">
        <div className="navbar">
          <div className="brand-nav">Hotelier</div>
          <div className="right-nav">
            <GiHamburgerMenu
              className="right-nav-icon"
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={showSideBar}
            />
            <ul className="right-nav-control">
              {user ? (
                <li>
                  <button className="mybutton" onClick={onLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#">
              <AiOutlineClose onClick={showSideBar} />
            </Link>
          </li>
          {user ? (
            <li className="nav-text">
              <button onClick={onLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="nav-text">
                <Link to="/login" onClick={showSideBar}>Login</Link>
              </li>
              <li className="nav-text">
                <Link to="/register" onClick={showSideBar}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
