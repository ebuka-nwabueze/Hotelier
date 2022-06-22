import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { getAllTickets, getSingleTicket, newTicket, NewTicketData, ticketUpdate } from "./ticketService";
import {UserResponseData} from "../auth/authService"

interface Ticket {
  id: string;
  user: string;
  category: string;
  description: string;
  status: string
}

export interface FullTicket extends Ticket {
  createdAt: string;
  updatedAt: string
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



// Create new Ticket
export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticketData: NewTicketData, thunkAPI) => {
    try {
      // Get token from the user in auth state
      const state = thunkAPI.getState() as RootState
      const user = state.auth.user as UserResponseData
      return await newTicket(ticketData, user.token);
    } catch (error) {
      let message = "";
      if (axios.isAxiosError(error)) {
        console.log("error message axios: ", error.message);
        message = error.message;
      } else if (error instanceof Error) {
        console.log("unexpected error of thrown: ", error.message);
        message = error.message;
      } else {
        console.log("unexpected error: ", error);
        message = "An unexpected error occurred";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
)
  
// update Ticket
export const updateTicket = createAsyncThunk(
  "tickets/update",
  async (ticketData: NewTicketData, thunkAPI) => {
    try {
      // Get token from the user in auth state
      const state = thunkAPI.getState() as RootState
      const user = state.auth.user as UserResponseData
      return await ticketUpdate(ticketData, user.token);
    } catch (error) {
      let message = "";
      if (axios.isAxiosError(error)) {
        console.log("error message axios: ", error.message);
        message = error.message;
      } else if (error instanceof Error) {
        console.log("unexpected error of thrown: ", error.message);
        message = error.message;
      } else {
        console.log("unexpected error: ", error);
        message = "An unexpected error occurred";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get single Ticket
export const getTicket = createAsyncThunk(
  "tickets/getTicket",
  async (ticketId: string, thunkAPI) => {
    try {
      // Get token from the user in auth state
      const state = thunkAPI.getState() as RootState
      const user = state.auth.user as UserResponseData
      return await getSingleTicket(ticketId, user.token);
    } catch (error) {
      let message = "";
      if (axios.isAxiosError(error)) {
        console.log("error message axios: ", error.message);
        message = error.message;
      } else if (error instanceof Error) {
        console.log("unexpected error of thrown: ", error.message);
        message = error.message;
      } else {
        console.log("unexpected error: ", error);
        message = "An unexpected error occurred";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get single Ticket
export const getTickets = createAsyncThunk(
  "tickets/getTickets",
  async (_,thunkAPI) => {
    try {
      // Get token from the user in auth state
      const state = thunkAPI.getState() as RootState
      const user = state.auth.user as UserResponseData
      return await getAllTickets(user.token);
    } catch (error) {
      let message = "";
      if (axios.isAxiosError(error)) {
        console.log("error message axios: ", error.message);
        message = error.message;
      } else if (error instanceof Error) {
        console.log("unexpected error of thrown: ", error.message);
        message = error.message;
      } else {
        console.log("unexpected error: ", error);
        message = "An unexpected error occurred";
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // Add any fetched data to the array
        state.ticket = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // Add any fetched data to the array
        state.ticket = action.payload;
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // Add any fetched data to the array
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // Add any fetched data to the array
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      // .addCase(ticketClose.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.tickets.map((ticket) =>
      //     ticket._id === action.payload._id
      //       ? (ticket.status = "closed")
      //       : ticket
      //   );
      // });
  },
});

export const { reset } = ticketSlice.actions;
export const selectTicket = (state: RootState) => state.ticket;


export default ticketSlice.reducer;