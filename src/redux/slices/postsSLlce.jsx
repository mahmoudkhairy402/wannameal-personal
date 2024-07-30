import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state of the slice
const initialState = {
  posts: [],
  comments: null,
  singlePost: null,
  feedPosts: [], // New property for feed posts
  randomPosts: [], // New property for random posts
  like: null,
  status: "idle",
  error: null,
};

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://fast-plat1.vercel.app/post/create",
        formData,
        {
          headers: {
            token: token,
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

export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async ({ token, postId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/post/${postId}`,
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

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ token, postId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://fast-plat1.vercel.app/post/like/${postId}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data; // Ensure to return response data
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async ({ postId, text, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://fast-plat1.vercel.app/post/reply/${postId}`,
        { text },
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
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

export const fetchRandomPosts = createAsyncThunk(
  "posts/fetchRandomPosts",
  async ({ token, lang }, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://fast-plat1.vercel.app/post");
      return response.data.posts;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFeedPosts = createAsyncThunk(
  "posts/fetchFeedPosts",
  async ({ token, lang }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/post/feed`,
        {
          headers: {
            token: token,
          },
        }
      );
      return response.data.feedPosts;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload : action.error.message;
      })
      .addCase(commentPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.comments = action.payload;
      })
      .addCase(commentPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload : action.error.message;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.like = action.payload;
      })

      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.singlePost = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload : action.error.message;
      })
      .addCase(fetchRandomPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRandomPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.randomPosts = action.payload;
      })
      .addCase(fetchRandomPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload : action.error.message;
      })
      .addCase(fetchFeedPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.feedPosts = action.payload;
      })
      .addCase(fetchFeedPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ? action.payload : action.error.message;
      });
  },
});

export const getCreatedPosts = (state) => state.posts.posts;
export const getFeedPosts = (state) => state.posts.feedPosts;
export const getRandomPosts = (state) => state.posts.randomPosts;
export const getPostError = (state) => state.posts.error;
export const getPostStatus = (state) => state.posts.status;
export const getlikkk = (state) => state.posts.like;
export const getCommentState = (state) => state.posts.comments;

export default postsSlice.reducer;
