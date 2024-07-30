import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://fast-plat1.vercel.app';

// Create an async thunk for fetching meals with try-catch for error handling
export const fetchMeals = createAsyncThunk('meals/fetchMeals', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseUrl}/meals`)
        return response.data.result;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Create the slice
const mealsSlice = createSlice({
    name: 'meals',
    initialState: {
        meals: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMeals.fulfilled, (state, action) => {
                state.loading = false;
                state.meals = action.payload;
                console.log(action.payload);
            })
            .addCase(fetchMeals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default mealsSlice.reducer;
