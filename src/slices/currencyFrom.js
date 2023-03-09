import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const ratesAdapter = createEntityAdapter();

const initialState = ratesAdapter.getInitialState();

const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    addFrom: ratesAdapter.setOne,
  },
});

export const { actions } = ratesSlice;
export const selectors = ratesAdapter.getSelectors((state) => state.rates);
export default ratesSlice.reducer;
