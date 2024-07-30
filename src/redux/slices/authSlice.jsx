import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const loginUser = createAsyncThunk("auth/login", async (user) => {
  try {
    const response = await axios.post(
      "https://fast-plat1.vercel.app/auth/login?lang=en",
      user
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user") || null),
    decodedToken: localStorage.getItem("user")
      ? jwtDecode(JSON.parse(localStorage.getItem("user"))?.token)
      : "",

    loading: false,
    error: null,
  },
  reducers: {
    logout(state, action) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getuser = (state) => state.auth.user;
export const getDecodedToken = (state) => state.auth.decodedToken;
export const { logout } = authSlice.actions;

export default authSlice.reducer;
