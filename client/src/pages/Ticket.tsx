import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import Spinner from "../components/Spinner";
import { getTicket, selectTicket } from "../features/tickets/ticketSlice";

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

  let dateCreated = ""
  if(ticket?.createdAt){
    const newDate = ticket?.createdAt as string
    dateCreated = new Date(parseInt(newDate)).toLocaleDateString()
  }

  useEffect(() => {
    if (ticketId) {
      dispatch(getTicket(ticketId));
    }
    if (isError) {
      toast.error(message);
    }
  }, [ticketId, message, isError]);

  if (isLoading) return <Spinner />;

  return (
    <div className="ticket-page container">
      <div className="ticket-info">
        <h2>Ticket Details</h2>
        <p> Ticket ID: {ticket?.id}</p>
        <p>Category: {ticket?.category}</p>
        <p>Date Submitted: {dateCreated}</p>
      </div>
      <div className="ticket-desc">
        <h3>Description of Issue</h3>
        <p>{ticket?.description}</p>
      </div>
    </div>
  );
}

export default Ticket;
