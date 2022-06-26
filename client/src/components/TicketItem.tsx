import React from "react";
import { Link } from "react-router-dom";

import { FullTicket } from "../features/tickets/ticketSlice";

type Ticket = {
  ticket: FullTicket;
};

const TicketItem = ({ ticket }: Ticket) => (
  <div className="ticket">
    <div>
      {ticket.createdAt
        ? new Date(parseInt(ticket.createdAt)).toLocaleDateString()
        : ""}
    </div>
    <div>{ticket.category}</div>
    <div className={`status ticket-${ticket.status}`}>{ticket.status}</div>
    <Link to={`/ticket/${ticket.id}`} className="btn-main btn-reverse">
      View
    </Link>
  </div>
);

export default TicketItem;
