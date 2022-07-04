import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useCreateTicket } from "../queryState/tickets/ticketQuery";

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

  const mutation = useCreateTicket()

  useEffect(() => {
    if (mutation.isError) {
      toast.error(mutation.error.message);
    }
    if (mutation.isSuccess) {
      toast.success("Ticket created successfully");
      navigate("/tickets");
    }
  }, [mutation.isError, mutation.isSuccess]);

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
    mutation.mutate(ticketData)
  };
  if (mutation.isLoading) return <Spinner />;

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
