import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios"
import { RootState } from '../../app/store';
import { authLogin, authRegister, UserLoginData, UserRegisterData, UserResponseData } from './authService';

export interface AuthState {
  user: UserResponseData | null | string
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  message: string
}

const user = JSON.parse(localStorage.getItem("user") || "")

const initialState: AuthState = {
  // user: user !== "" ? user : null,
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register new user

export const register = createAsyncThunk(
  "auth/register",
  async (user: UserRegisterData, thunkAPI) => {
    try {
      return await authRegister(user);
    } catch (error) {
      let message = ""
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        message = error.message;
      } else {
        console.log('unexpected error: ', error);
        message =  'An unexpected error occurred';
      }
        return thunkAPI.rejectWithValue(message)
    }
  }
);

//Login user
export const login = createAsyncThunk("auth/login", async (user:UserLoginData, thunkAPI) => {
  try {
    return await authLogin(user);
  } catch (error) {
    let message = ""
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      message = error.message;
    } else {
      console.log('unexpected error: ', error);
      message =  'An unexpected error occurred';
    }
      return thunkAPI.rejectWithValue(message)


  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      // .addCase(register.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.isError = true
      //   state.message = action.payload
      //   state.user = null
      // })
      // .addCase(logout.fulfilled, (state) => {
      //   state.user = null
      // })
      // .addCase(login.pending, (state) => {
      //   state.isLoading = true
      // })
      // .addCase(login.fulfilled, (state, action) => {
      //   state.isLoading = false
      //   state.isSuccess = true
      //   state.user = action.payload
      // })
      // .addCase(login.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.isError = true
      //   state.message = action.payload
      //   state.user = null
      // })
  }
});

export const {reset} = authSlice.actions

export default authSlice.reducer;