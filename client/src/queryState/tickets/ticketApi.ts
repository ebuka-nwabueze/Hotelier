import axios from "axios"
import { TicketsResponse, TicketResponse, UpdateTicketData , UpdateTicketResponse} from "../../types/types";

const API_URL = "/graphql";


export const getAllTickets = async (token: string) => {

  const graphqlQuery = {
    operationName: "tickets",
    query: `query tickets{
      tickets {
        id
        user
        description
        category
        status
        createdAt
        updatedAt
      }
    }`
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
  console.log("making axios getAllTicket request")
  const response = await axios.post<TicketsResponse>(API_URL,graphqlQuery, config)
  const condition1 = response.data.data.tickets !== null
  if(!condition1) {
    const error = response.data.errors[0]
    throw new Error(error.message)
  }

  return response.data.data.tickets
}

export const getSingleTicket = async (ticketId: string | undefined, token: string) => {

  if (typeof ticketId === "undefined"){
    Promise.reject(new Error("ticketId is invalid"))
  }

  const graphqlQuery = {
    operationName: "ticket",
    query: `query ticket($id: String!){
      ticket(id: $id) {
        id
        user
        description
        category
        status
        createdAt
        updatedAt
      }
    }`,
    variables: {
      id: ticketId
    },
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
  const response = await axios.post<TicketResponse>(API_URL,graphqlQuery, config)
  const condition1 = response.data.data.ticket !== null
  if(!condition1) {
    const error = response.data.errors[0]
    throw new Error(error.message)
  }

  return response.data.data.ticket
}

// Update ticket
export const ticketUpdate = async (ticketData: UpdateTicketData, token: string) => {
  const {id, description, category} = ticketData;

  const graphqlQuery = {
    operationName: "updateTicket",
    query: `mutation updateTicket($id: String!, $description: String!, $category: String!){
      updateTicket(id: $id, description: $description, category: $category) {
        id
        user
        description
        category
      }
    }`,
    variables: {
      description,
      category,
      id
    },
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }

  const response = await axios.post<UpdateTicketResponse>(API_URL,graphqlQuery, config)
  console.log(response)
  const condition1 = response.data.data.updateTicket !== null
  if(!condition1) {
    const error = response.data.errors[0]
    throw new Error(error.message)
  }
  return response.data.data.updateTicket

}