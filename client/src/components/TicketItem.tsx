import React from 'react'
import { Link } from 'react-router-dom'

import { FullTicket } from '../features/tickets/ticketSlice'

type Ticket = {
  ticket: FullTicket
}

function TicketItem({ticket}: Ticket) {

  let dateCreated = "";
  if (ticket?.createdAt) {
    const newDate = ticket?.createdAt as string;
    dateCreated = new Date(parseInt(newDate)).toLocaleDateString();
  }

  return (
    <div className="ticket">
      <div>{dateCreated}</div>
      <div>{ticket.category}</div>
      <div className={`status ticket-${ticket.status}`}>{ticket.status}</div>
      <Link to={`/ticket/${ticket.id}`} className="btn-main btn-reverse">
        View
      </Link>
    </div>
  )
}

export default TicketItem
