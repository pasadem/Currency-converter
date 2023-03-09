import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const currToAdapter = createEntityAdapter();

const initialState = currToAdapter.getInitialState();

const ratesSlice = createSlice({
  name: "currencyTo",
  initialState,
  reducers: {
    addTo: currToAdapter.setOne,
  },
});

export const { actions } = ratesSlice;
export const selectors = currToAdapter.getSelectors((state) => state.currencyTo);
export default ratesSlice.reducer;
