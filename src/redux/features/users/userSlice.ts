import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApiResponse, INewUser, IUser } from './../../../shared/globalTypes';


interface IUserState {
  userId: string;
  accessToken: string | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null | object;
}


const initialUserState: IUserState = {
  userId: '',
  accessToken: null,
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async({email, password, confirmPassword}: INewUser)=>{
    const response = await fetch(`http://localhost:5000/api/v1/auth/signup`,{
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({email, password, confirmPassword}),
    });

    const apiResponse = await response.json();
    if(!response.ok){
      throw new Error(apiResponse?.message);
    }
    return apiResponse;
  }
);

export const login = createAsyncThunk(
  "user/loginUser",
  async(userData: IUser)=> {
    const response = await fetch(`http://localhost:5000/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const apiResponse: IApiResponse = await response.json();
    if(!response.ok){
      throw new Error(apiResponse.message)
    }
    return apiResponse;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.userId = action.payload.userId;
        state.error = null;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.accessToken = null;
        state.userId = '';
        state.error = action.payload ?? "Error Occurred";
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export const {logout} = userSlice.actions;
export default userSlice.reducer