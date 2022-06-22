import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getTicket, reset, selectTicket } from "../features/tickets/ticketSlice";
import { Link } from 'react-router-dom'


function Ticket() {
  const dispatch = useAppDispatch();
  const {
    tickets,
    ticket,
    isError,
    isSuccess,
    isLoading,
    message,
  } = useAppSelector(selectTicket);
  const { ticketId } = useParams<{ ticketId: string }>();

  let dateCreated = "";
  if (ticket?.createdAt) {
    const newDate = ticket?.createdAt as string;
    dateCreated = new Date(parseInt(newDate)).toLocaleDateString();
  }

  useEffect(() => {
    if (ticketId) {
      dispatch(getTicket(ticketId));
    }
    if (isError) {
      toast.error(message);
    }
  }, [ticketId, message, isError]);

  const resetOnClick = () => {
    dispatch(reset())
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="ticket-page">

        <BackButton url="/tickets" />
        <h2 className="aln-cnt">Ticket Details</h2>
        <div className="ticket-top">
          <div className="ticket-status">
            <p className={`ticket-${ticket?.status}`}>
              <span className="ticket-status-text">{ticket?.status}</span>
            </p>
          </div>
          <div className="ticket-info">
            <p> Ticket ID: {ticket?.id}</p>
            <p>Category: {ticket?.category}</p>
            <p>Date Submitted: {dateCreated}</p>
          </div>
        </div>
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket?.description}</p>
        </div>
        <Link to={`/ticket/update/${ticket?.id}`} onClick={resetOnClick}> 
          Update
        </Link>
    </div>
  );
}

export default Ticket;
