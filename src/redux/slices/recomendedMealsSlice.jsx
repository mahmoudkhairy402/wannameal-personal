import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  recomendedMeals: [],
  singleMeal: [],
  savedMeals: [],
  myRecipes: [],
  commonMeals: [],
  savedMeal: null,
  status: "idle",
  error: null,
};

export const recommendMeals = createAsyncThunk(
  "meals/recommendMeals",
  async ({ ingredients, lang, token }, { rejectWithValue }) => {
    try {
      console.log("Sending request to API with params:", {
        lang: lang,
        ingredients: ingredients,
      });

      const response = await axios.get(
        `https://tesst11.azurewebsites.net/meals/recommendMeal?lang=${lang}&ingredients=${ingredients}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      return response.data.Recommendation;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const recommendMeals = createAsyncThunk(
//   "meals/recommendMeals",
//   async ({ ingredients, lang,token }, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         `https://tesst11.azurewebsites.net/meals/recommendMeal?lang=${lang}&ingredients=${JSON.stringify(ingredients)}`,
//         {
//           method: 'GET',
//           headers: {
//            token: token,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       const data = await response.json(); // Parse response body as JSON
//       console.log("Response from API:", data);
//       return data; // Assuming Recommendation is in the response
//     } catch (error) {
//       console.error("Error from API:", error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const fetchSingleMeal = createAsyncThunk(
  "meals/fetchSingleMeal",
  async (productId) => {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await res.json();
    return data;
  }
);

export const fetchSavedMeals = createAsyncThunk(
  "meals/fetchSavedMeals",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/meals?isSaved=true&id=${userId}`
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchMyRecipes = createAsyncThunk(
  "meals/fetchMyRecipes",
  async ({ userId, lang }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://fast-plat1.vercel.app/meals?user=${userId}`
      );
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveMeal = createAsyncThunk(
  "meals/saveMeal",
  async ({ mealData, token, mealId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://fast-plat1.vercel.app/meals/isSaved?id=${mealId}`,
        mealData,
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCommonMeals = createAsyncThunk(
  "meals/fetchCommonMeals",
  async ({ token, lang }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://tesst11.azurewebsites.net/meals/common-meals?lang=${lang}`,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recommendMeals.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(recommendMeals.fulfilled, (state, action) => {
        state.recomendedMeals = action.payload;
        state.status = "succeeded";
      })
      .addCase(recommendMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSingleMeal.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSingleMeal.fulfilled, (state, action) => {
        state.singleMeal = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSingleMeal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSavedMeals.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSavedMeals.fulfilled, (state, action) => {
        state.savedMeals = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchSavedMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchMyRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMyRecipes.fulfilled, (state, action) => {
        state.myRecipes = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMyRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCommonMeals.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCommonMeals.fulfilled, (state, action) => {
        state.commonMeals = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCommonMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(saveMeal.fulfilled, (state, action) => {
        state.savedMeal = action.payload;
        state.status = "succeededddd";
      })
      .addCase(saveMeal.rejected, (state, action) => {
        state.savedMeal = action.payload;
        // state.status = "rejected";
      });
  },
});

export const getRecommendMeals = (state) => state.meals.recomendedMeals;
export const getSingleMeal = (state) => state.meals.singleMeal;
export const getSavedMeals = (state) => state.meals.savedMeals;
export const getMyRecipes = (state) => state.meals.myRecipes;
export const getCommonMeals = (state) => state.meals.commonMeals;
export const getsSavedMeal = (state) => state.meals.savedMeal;
export const getMealsStatus = (state) => state.meals.status;
export const getMealsError = (state) => state.meals.error;

export default mealsSlice.reducer;
