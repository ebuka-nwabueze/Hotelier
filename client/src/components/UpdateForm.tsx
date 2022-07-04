import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import {  FullTicket } from "../types/types";
import { useUpdateTicket } from "../queryState/tickets/ticketQuery";


export interface FormData {
  description: string;
  category: string;
}

interface Ticket {
  ticket: FullTicket
}

interface TicketEdit {
  ticket: FullTicket;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdateForm({ticket, setIsEdit }: TicketEdit ) {

  const [formData, setformData] = useState<FullTicket>({...ticket});
  const {category, description, id} = formData

  const mutation = useUpdateTicket()
  
  type EventType =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLTextAreaElement>;

  const inputChange = (e: EventType) => {
    setformData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ticketData = { description, category, id };
    mutation.mutate(ticketData)
  };

  //once the form is updated succesfully
  useEffect(() => {
    if(mutation.isSuccess){
      setIsEdit(prev => !prev)
    }
  }, [mutation.isSuccess])

  const onCancel = () => {
    setIsEdit((prev) => !prev)
  }

  if (mutation.isLoading) return <Spinner />;

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
            <button onClick={onCancel} className="btn-main btn-cancel">
              Cancel
            </button>
            <button className="btn-main btn-upd" type="submit">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UpdateForm;
