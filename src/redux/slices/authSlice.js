import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const getLogin = createAsyncThunk(
  "localhost:4444/auth/login",
  async (params) => {
    let { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const getAuthMe = createAsyncThunk(
  "localhost:4444/auth/me",
  async () => {
    let { data } = await axios.get("/auth/me");
    return data;
  }
);

export const getRegister = createAsyncThunk(
  "localhost:4444/auth/register",
  async (params) => {
    let { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    status: "loading",
  },
  reducers: {
    Logout: (state) => {
      state.data = null;
      window.localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [getLogin.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [getLogin.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
    },
    [getLogin.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [getAuthMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [getAuthMe.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
    },
    [getAuthMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
    [getRegister.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [getRegister.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload;
    },
    [getRegister.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export default authSlice.reducer;

export const { Logout } = authSlice.actions;
