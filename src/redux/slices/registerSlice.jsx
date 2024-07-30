import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData) => {
        try {
            const response = await axios.post("https://fast-plat1.vercel.app/auth/register?lang=en", userData)
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

const signupSlice = createSlice({
    name: "signup",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                console.log(action.payload);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default signupSlice.reducer;