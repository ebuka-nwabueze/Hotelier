import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import "./Navbar/navbar.css"
import { useUserStatus } from "../hooks/useUserStatus";
import { UserResponseData } from "../types/types";

const Header = () => {
  const navigate = useNavigate();

  const {user: userInfo, clearUser} = useUserStatus()
  const [user, setUser] = useState<UserResponseData| null>(userInfo);
  const [sidebar, setSidebar] = useState<boolean>(false);
  const showSideBar = () => setSidebar(!sidebar);

  // set user immediately the user status changes. 
  // This shows the appropriate view of login, logout etc
  useEffect(() => {
    setUser(userInfo)
  }, [userInfo]);

  const onLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    clearUser()
    setUser(null)
    if(sidebar) setSidebar(!sidebar);
    navigate("/login");
  };

  const resetTicket = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    showSideBar()

  }

  return (
    <>
      <nav className="header">
        <div className="navbar">
          <div className="brand-nav">
            <Link className="brand" to="/">Hotelier</Link>
          </div>
          <div className="right-nav">
            <GiHamburgerMenu
              className="right-nav-icon"
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={showSideBar}
            />
            <ul className="right-nav-control">
              {user ? (
                <>
                  <li>
                    <Link to="/tickets">Tickets</Link>
                  </li>
                  <li>
                    <Link to="/new-ticket">New Ticket</Link>
                  </li>
                  <li>
                    <button className="mybutton" onClick={onLogout}>
                      Logout
                    </button>
                  </li>
                </>
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
            <>
              <li className="nav-text">
                <Link to="/new-ticket" onClick={resetTicket}>
                  New Ticket
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/tickets" onClick={showSideBar}>My Tickets</Link>
              </li>
              <li className="nav-text">
                <button onClick={onLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-text">
                <Link to="/login" onClick={showSideBar}>
                  Login
                </Link>
              </li>
              <li className="nav-text">
                <Link to="/register" onClick={showSideBar}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
