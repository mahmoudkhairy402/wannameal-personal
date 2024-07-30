import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ingredients: [],
  status: "idle",
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async ({ token, lang }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/Ingredients/getAll?lang=${lang}`,
        {
          headers: {
            token: `${token}`,
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      return response.data.data; // Assuming the response has a field called `ingredients`
    } catch (error) {
      console.error("Error fetching ingredients:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const getIngredients = (state) => state.ingredients.ingredients;
export const getIngredientsStatus = (state) => state.ingredients.status;
export const getIngredientsError = (state) => state.ingredients.error;

export default ingredientsSlice.reducer;
