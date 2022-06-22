import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import {
  createTicket,
  reset,
  selectTicket,
} from "../features/tickets/ticketSlice";
import { selectAuth } from "../features/auth/authSlice";

export interface FormData {
  description: string;
  category: string;
}

function NewTicket() {
  const [formData, setformData] = useState<FormData>({
    description: "",
    category: "Other",
  });
  const { description, category } = formData;
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
  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Ticket created successfully");
      navigate("/tickets");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

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
    dispatch(createTicket(ticketData));
  };
  if (isLoading) return <Spinner />;

  return (
    <div className="form-content">
      <section className="form-content-heading">
        <h1>Create New Ticket</h1>
        <p>Enter details for new Ticket</p>
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
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Create
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default NewTicket;
