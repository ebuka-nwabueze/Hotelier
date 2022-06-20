import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import { getTicket, getTickets, selectTicket } from "../features/tickets/ticketSlice";



function Tickets() {
  const {
    tickets,
    isError,
    isSuccess,
    isLoading,
    message,
  } = useAppSelector(selectTicket);
  const dispatch = useAppDispatch()

  useEffect(() => {

    dispatch(getTickets())
    if (isError) {
      toast.error(message);
    }
  }, [ message, isError]);

  if (isLoading) return <Spinner />;

  return (
    <div className="ticket-page">
      <BackButton url="/" />
      <h1 className="aln-cnt">Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Category</div>
          <div>Status</div>
          <div></div>
        </div>
        {
          tickets ? 
           tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))
          : <>No Tickets Found</>
        }

      </div>
    </div>
  )
}

export default Tickets
