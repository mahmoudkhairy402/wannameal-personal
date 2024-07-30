import { createSlice } from "@reduxjs/toolkit";

const loadTheme = () => {
  try {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : "dark";
  } catch (err) {
    return "light";
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem("theme", JSON.stringify(theme));
  } catch (err) {}
};

const initialState = {
  theme: loadTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      saveTheme(state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const getTheme = (state) => state.theme.theme;
export default themeSlice.reducer;
