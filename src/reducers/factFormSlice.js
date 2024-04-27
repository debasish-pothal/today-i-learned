import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
};

export const factFormSlice = createSlice({
  name: "factForm",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggle } = factFormSlice.actions;

export const showForm = (state) => state.factForm.isVisible;

export default factFormSlice.reducer;
