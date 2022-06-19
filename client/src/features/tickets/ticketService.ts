import axios from "axios"

const API_URL = "/graphql";

export interface NewTicketData {
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

export interface TicketResponse {
  data: {
    ticket:FullTicketResponseData
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
  console.log("making axios getTicket request", ticketId)
  const response = await axios.post<TicketResponse>(API_URL,graphqlQuery, config)
  console.log(response)
  const condition1 = response.data.data.ticket !== null
  if(!condition1) {
    const error = response.data.errors[0]
    throw new Error(error.message)
  }

  return response.data.data.ticket
}