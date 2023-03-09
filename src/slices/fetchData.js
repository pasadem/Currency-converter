import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const listAdapter = createEntityAdapter();

const initialState = listAdapter.getInitialState();

export const fetchInitialData = createAsyncThunk(
  'list/fetchAll',
  async () => {
    const  { data }  = await axios.get("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json");
    return data;
  }, 
);

const listSlice = createSlice({
  name: 'list',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
      state.loading = 'loading';
    })
      .addCase(fetchInitialData.fulfilled, listAdapter.setOne)
      
  },
});

export const { actions } = listSlice;
export const selectors = listAdapter.getSelectors((state) => state.list);
export default listSlice.reducer;