import { createSlice } from "@reduxjs/toolkit";

const partsSlice = createSlice({
  name: "parts",
  initialState: {
    parts: [],
  },

  reducers: {
    setParts: (state, action) => {
      state.parts = action.payload;
      console.log(action.payload);
    },

    addPart: (state, action) => {
      state.parts = [...state.parts, action.payload];
    },

    updatePart: (state, action) => {
      const updatedPart = action.payload;
      state.parts = state.parts.map((part) =>
        part.idp === updatedPart.idp
          ? { ...part, namep: updatedPart.namep, price: updatedPart.price, service_id: updatedPart.service_id }
          : part
      );
    },
    
    deletePart: (state, action) => {
      state.parts = state.parts.filter((part) => part.idp !== action.payload);
    },
  },
});

export const { setParts, addPart, updatePart, deletePart } = partsSlice.actions;
export default partsSlice.reducer;
