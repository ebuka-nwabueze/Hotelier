export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegisterData extends UserLoginData {
  name: string;
}

export interface UserResponseData {
  token: string;
  id: string;
  name: string;
  email: string;
}

export interface UserRegisterResponse {
  data: {
    addUser: UserResponseData
  }
  errors: [
    {message: string}
  ]
}

export interface ErrorResponse {
  
}

export interface UserLoginResponse {
  data: {
    login: UserResponseData
  },
  errors: [
    { message: string}
  ]
}


interface Ticket {
  id: string;
  user: string;
  category: string;
  description: string;
  status: string;
}

export interface FullTicket extends Ticket {
  createdAt: string;
  updatedAt: string;
}

export interface TicketState {
  tickets: FullTicket[] | null;
  ticket: FullTicket | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any;
}

const initialState: TicketState = {
  tickets: null,
  ticket: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


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

export interface FullTicketResponseData extends NewTicketResponseData {
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