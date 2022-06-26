import React from "react";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import NewTicket from "./pages/NewTicket";
import PrivateRoute from "./components/PrivateRoute";
import Ticket from "./pages/Ticket";
import Tickets from "./pages/Tickets";
import UpdateTicket from "./pages/UpdateTicket";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="flex-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/new-ticket" element={<PrivateRoute />}>
                <Route path="/new-ticket" element={<NewTicket />} />
              </Route>
              <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
                <Route path="/ticket/:ticketId" element={<Ticket />} />
              </Route>
              <Route path="/ticket/update/:ticketId" element={<PrivateRoute />}>
                <Route
                  path="/ticket/update/:ticketId"
                  element={<UpdateTicket />}
                />
              </Route>
              <Route path="/tickets/" element={<PrivateRoute />}>
                <Route path="/tickets/" element={<Tickets />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
