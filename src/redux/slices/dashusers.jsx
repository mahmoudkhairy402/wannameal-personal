import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
    users: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Create an async thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('https://fast-plat1.vercel.app/users', {
        headers: {
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2N2M5ZjUyODg0NzNhZjBhMWY0ZTI0YSIsImVtYWlsIjoiYW1sZ2FtYWwxMDNAZ21haWwuY29tIiwiaWF0IjoxNzE5NDQzNDg5fQ.NAoaGb61PNvQxWNHaMINqHTxZaGaTZVd5qMPBfjuvok'
        }
    });
    const data = await response.json();
    return data;
});

// Create the user slice
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
                console.log(action.payload);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default userSlice.reducer;
