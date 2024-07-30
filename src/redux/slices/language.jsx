import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    switchToEnglish: (state) => {
      state.language = "en";
    },
    switchToArabic: (state) => {
      state.language = "ar";
    },
  },
});

export const { switchToEnglish, switchToArabic } = languageSlice.actions;
export const getLanguage = (state) => state.language.language;
export default languageSlice.reducer;
