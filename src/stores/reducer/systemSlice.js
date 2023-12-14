import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
  name: "system",
  initialState: {
    activeKey: "",
  },
  reducers: {
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
  },
});

export const { setActiveKey } = systemSlice.actions;
export default systemSlice.reducer;
export const selectSystem = (state) => state.system;
