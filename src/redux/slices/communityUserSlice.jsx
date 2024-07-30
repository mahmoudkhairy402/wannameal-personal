import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: null,
  updatedProfile: null,
  suggestedUsers: [],
  followingUsers: [],
  follow: null,
  status: "idle",
  error: null,
};

export const getProfileById = createAsyncThunk(
  "communityUser/getProfileById",
  async ({ userId, token, lang }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/auth/profile/${userId}?lang=${lang}`,
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "communityUser/updateProfile",
  async ({ formData, token, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://fast-plat1.vercel.app/auth/update/${userId}`,
        formData,
        {
          headers: {
            token: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const followUser = createAsyncThunk(
  "communityUser/followUser",
  async ({ userId, token, lang }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://fast-plat1.vercel.app/auth/follow/${userId}?lang=${lang}`,

        {},
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFollowingUsers = createAsyncThunk(
  "communityUser/fetchFollowingUsers",
  async ({ token, lang, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/auth/following?page=${page}`,
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data.following.following;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchSuggestedUsers = createAsyncThunk(
  "communityUser/fetchSuggestedUsers",
  async ({ token, lang }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/auth/suggested?lang=${lang}`,
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const communityUserSlice = createSlice({
  name: "communityUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Profile by ID
      .addCase(getProfileById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // update Profile by ID
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.updatedProfile = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Follow User
      .addCase(followUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.follow = action.payload;
        state.error = null;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Get Suggested Users
      .addCase(fetchSuggestedUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSuggestedUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suggestedUsers = action.payload;
        state.error = null;
      })
      .addCase(fetchSuggestedUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // Get Following Users
      .addCase(fetchFollowingUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFollowingUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followingUsers = action.payload;
        state.error = null;
      })
      .addCase(fetchFollowingUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const getProfile = (state) => state.communityUser.profile;
export const getSuggestedUsers = (state) => state.communityUser.suggestedUsers;
export const getFollowingUsers = (state) => state.communityUser.followingUsers;
export const getupdatedProfile = (state) => state.communityUser.updatedProfile;

export default communityUserSlice.reducer;
