import axios from "axios"

const API_URL = "/graphql";

export interface NewTicketData {
  description: string;
  category: string
}

export interface UpdateTicketData {
  id: string;
  description: string;
  category: string
}

interface NewTicketResponseData {
  id: string;
  user: string; 
  description: string;
  category: string 
}

interface FullTicketResponseData extends NewTicketResponseData {
  createdAt: string;
  updatedAt: string;
  status: string
}

export interface NewTicketResponse {
  data: {
    addTicket: FullTicketResponseData
  }
  errors: [
    {message: string}
  ]
}

export interface UpdateTicketResponse {
  data: {
    updateTicket: FullTicketResponseData
  }
  errors: [
    {message: string}
  ]
}

export interface DeleteTicketResponse {
  data: {
    deleteTicket: string
  }
  errors: [
    {message: string}
  ]
}

export interface TicketResponse {
  data: {
    ticket:FullTicketResponseData
  }
  errors: [
    {message: string}
  ]
}

export interface TicketsResponse {
  data: {
    tickets:FullTicketResponseData[]
  }
  errors: [
    {message: string}
  ]
}

export const newTicket = async (ticketData: NewTicketData, token: string) => {
  const {description, category} = ticketData;

  const graphqlQuery = {
    operationName: "addTicket",
    query: `mutation addTicket($description: String!, $category: String!){
      addTicket(description: $description, category: $category) {
        id
        user
        description
        category
      }
    }`,
    variables: {
      description,
      category
    },
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }

  const response = await axios.post<NewTicketResponse>(API_URL,graphqlQuery, config)
  console.log(response)
  const condition1 = response.data.data.addTicket !== null
  if(!condition1) {
    const error = response.data.errors[0]
    throw new Error(error.message)
  }
  return response.data.data.addTicket

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

export const getSingleTicket = async (ticketId: string, token: string) => {

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

export const ticketDelete = async (ticketId: string, token: string) => {

  const graphqlQuery = {
    operationName: "deleteTicket",
    query: `mutation deleteTicket($id: String!){
      deleteTicket(id: $id)
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
  const response = await axios.post<DeleteTicketResponse>(API_URL,graphqlQuery, config)
  console.log(response)
  const condition1 = response.data.data.deleteTicket !== null
  if(!condition1) {
    const error = response.data.errors[0]
    throw new Error(error.message)
  }

  return response.data.data.deleteTicket
}