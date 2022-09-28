import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import BackButton from "../components/BackButton"; 
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import {
  getTicket,
  getTickets,
  reset,
  selectTicket,
} from "../features/tickets/ticketSlice";

function Tickets() {
  const { tickets, isError, isSuccess, isLoading , message} = useAppSelector(
    selectTicket
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTickets());
    if (isError) {
      toast.error(message);
    }

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [message, isError, isSuccess]);

  if (isLoading) return <Spinner />;

  return (
    <div className="ticket-page">
      <BackButton url="/" />
      <h1 className="aln-cnt">Tickets</h1>
      <div className="tickets">
        {tickets?.length ? (
          <>
            <div className="ticket-headings">
              <div>Date</div>
              <div>Category</div>
              <div>Status</div>
              <div></div>
            </div>
            {tickets.map((ticket) => (
              <TicketItem key={ticket.id} ticket={ticket} />
            ))}
          </>
        ) : (
          <p className="aln-cnt">No Tickets Found</p>
        )}
      </div>
    </div>
  );
}

export default Tickets;
