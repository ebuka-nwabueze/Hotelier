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
import { useSingleTicket } from "../queryState/tickets/ticketQuery";
import UpdateForm from "../components/UpdateForm";

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
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const data = useSingleTicket(ticketId)

  let dateCreated = "";
  if (data.data?.createdAt) {
    const newDate = data.data?.createdAt as string;
    dateCreated = new Date(parseInt(newDate)).toLocaleDateString();
  }

  useEffect(() => {
    if (ticketId) {
      
      console.log("dispatching Ticket page");
    }
    if (data.isError) {
      toast.error(data.error.message);
    }
    if(isSuccess && isDelete){
      navigate("/tickets")
      toast.success("Ticket deleted Succesfully")
    }
  }, [ticketId, message, data.isError, isDelete, isSuccess]);

  const resetOnClick = () => {
    dispatch(reset());
  };

  const onDelete = () => {
    if(window.confirm("Do you want to Delete?")){
      const id = data.data?.id as string
      dispatch(deleteTicket(id))
      setIsDelete(prev => !prev)
    }
  }

  const onUpdate = () => {
    setIsEdit(!isEdit)
  }

  if (data.isLoading || !data.data) return <Spinner />;

  return (
  isEdit ? <UpdateForm ticket={data.data} setIsEdit={setIsEdit}/> :
  
  <>
    <div className="ticket-page">
      <BackButton url="/tickets" />
      <h2 className="aln-cnt">Ticket Details</h2>
      <div className="ticket-top">
        <div className="ticket-status">
          <p className={`ticket-${data.data?.status}`}>
            <span className="ticket-status-text">{data.data?.status}</span>
          </p>
        </div>
        <div className="ticket-info">
          <p> Ticket ID: {data.data?.id}</p>
          <p>Category: {data.data?.category}</p>
          <p>Date Submitted: {dateCreated}</p>
        </div>
      </div>
      <div className="ticket-desc">
        <h3>Description of Issue</h3>
        <p>{data.data?.description}</p>
      </div>
      <div className="button-group">
        <button className="btn-main btn-cancel" onClick={onDelete}>
          Delete
        </button>
        <button
          onClick={onUpdate}
          className="btn-main btn-upd"
        >
          Update
        </button>
      </div>
    </div> 
    </>

  );
}

export default Ticket;
