import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
  },
  reducers: {
    add(state, action) {
      state.items.push(action.payload.id);
    },
    remove(state, action) {
      state.items = state.items.filter((item) => {
        return item !== action.payload.id;
      });
    },
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice.reducer;
