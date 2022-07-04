import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useDeleteTicket, useSingleTicket } from "../queryState/tickets/ticketQuery";
import UpdateForm from "../components/UpdateForm";

function Ticket() {
  const navigate = useNavigate();


  const { ticketId } = useParams<{ ticketId: string }>();
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const data = useSingleTicket(ticketId)
  const deleteMutation = useDeleteTicket ()


  let dateCreated = "";
  if (data.data?.createdAt) {
    const newDate = data.data?.createdAt as string;
    dateCreated = new Date(parseInt(newDate)).toLocaleDateString();
  }


  useEffect(() => {

    if (deleteMutation.isError) {
      toast.error(deleteMutation.error.message);
    }
    if (deleteMutation.isSuccess){
      navigate("/tickets")
      toast.success("Ticket deleted Succesfully")
    }
    // eslint-disable-next-line
  }, [deleteMutation.isError, deleteMutation.isSuccess]);


  const onDelete = () => {
    if(window.confirm("Do you want to Delete?")){
      const id = data.data?.id as string
      deleteMutation.mutate(id)
    }
  }

  const onUpdate = () => {
    setIsEdit(!isEdit)
  }

  if (data.isLoading || !data.data || deleteMutation.isLoading) return <Spinner />;

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

  // // eslint-disable-next-line