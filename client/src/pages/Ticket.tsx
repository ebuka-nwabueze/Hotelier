import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import {
  deleteTicket,
  getTicket,
  reset,
  selectTicket,
} from "../features/tickets/ticketSlice";
import { Link } from "react-router-dom";

function Ticket() {
  const navigate = useNavigate();
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
  const [isDelete, setIsDelete] = useState<boolean>(false)


  let dateCreated = "";
  if (ticket?.createdAt) {
    const newDate = ticket?.createdAt as string;
    dateCreated = new Date(parseInt(newDate)).toLocaleDateString();
  }

  useEffect(() => {
    if (ticketId) {
      dispatch(getTicket(ticketId));
      console.log("dispatching Ticket page");
    }
    if (isError) {
      toast.error(message);
    }
    if(isSuccess && isDelete){
      navigate("/tickets")
      toast.success("Ticket deleted Succesfully")
    }
  }, [ticketId, message, isError, isDelete, isSuccess]);

  const resetOnClick = () => {
    dispatch(reset());
  };

  const onDelete = () => {
    if(window.confirm("Do you want to Delete?")){
      const id = ticket?.id as string
      dispatch(deleteTicket(id))
      setIsDelete(prev => !prev)
    }
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
      <div className="button-group">
        <button className="btn-main btn-cancel" onClick={onDelete}>
          Delete
        </button>
        <Link
          to={`/ticket/update/${ticket?.id}`}
          onClick={resetOnClick}
          className="btn-main btn-upd"
        >
          Update
        </Link>
      </div>
    </div>
  );
}

export default Ticket;
