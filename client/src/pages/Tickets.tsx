import React, { useEffect } from "react";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import TicketItem from "../components/TicketItem";
import { useAllTickets } from "../queryState/tickets/ticketQuery";

function Tickets() {
  const results = useAllTickets()
  
  useEffect(() => {
    if (results.isError) {
      toast.error(results.error.message);
    }

    return () => {
      if (results.isSuccess) {
      }
    };
    // eslint-disable-next-line
  }, [results.isError, results.isSuccess]);

  if (results.isLoading) return <Spinner />;

  // if(results.data) console.log(results.data)

  return (
    <div className="ticket-page">
      <BackButton url="/" />
      <h1 className="aln-cnt">Tickets</h1>
      <div className="tickets">
        {results.data?.length ? (
          <>
            <div className="ticket-headings">
              <div>Date</div>
              <div>Category</div>
              <div>Status</div>
              <div></div>
            </div>
            { results.data && results.data.map((ticket) => (
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
