import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTicket,
  getTicket,
  reset,
  selectTicket,
  updateTicket,
} from "../features/tickets/ticketSlice";

export interface FormData {
  description: string;
  category: string;
}

function UpdateTicket() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ticketId } = useParams<{ ticketId: string }>();

  const { ticket, isError, isSuccess, isLoading, message } = useAppSelector(
    selectTicket
  );

  // let ticketDesc: string;
  // let ticketCat: string;
  // if(ticket){
  //   ticketDesc = ticket.description
  //   ticketCat = ticket.category
  // }

  const [formData, setformData] = useState<FormData>({
    description: ticket ? ticket?.description : "",
    // description: (!isLoading && ticket?.description) && ticket?.description ,
    category: ticket ? ticket?.category : "Other",
  });
  

  useEffect(() => {
    if(isSuccess && ticket){
      setformData((prev) => ({ 
        ...prev, 
        category: ticket.category,
        description: ticket.description
      }));
    }
  }, [isSuccess, ticket])

  const { description, category } = formData;

  useEffect(() => {
    if (ticketId) {
      dispatch(getTicket(ticketId));
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Ticket updated successfully");
      navigate("/tickets");
    }

    dispatch(reset());
  }, [isError, message, dispatch, ticketId]);

  type EventType =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLTextAreaElement>;

  const inputChange = (e: EventType) => {
    setformData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ticketData = { description, category };
    dispatch(updateTicket(ticketData));
  };
  if (isLoading && !ticket) return <Spinner />;

  return (
    <div className="form-content">
      <section className="form-content-heading">
        <h1>Update Ticket</h1>
        <p>Enter details to update Ticket</p>
      </section>

      <section className="form-content-main">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              name="category"
              value={category}
              id="category"
              onChange={inputChange}
            >
              {/* <option value="">-- Select Category --</option> */}
              <option value="Other">Other</option>
              <option value="Duplicate">Duplicate</option>
              <option value="Image Error">Image Error</option>
              <option value="Advertiser Relations">Advertiser Relations</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter your description"
              value={description}
              onChange={inputChange}
              required
            />
          </div>
          <div className="button-group">
            <Link to={`/ticket/${ticket?.id}`} className="btn-main btn-cancel">
              Cancel
            </Link>
            <button className="btn-main btn-upd" type="submit">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UpdateTicket;
