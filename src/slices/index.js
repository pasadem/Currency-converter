import { configureStore } from '@reduxjs/toolkit';
import ratesReducer from './currencyFrom.js';
import currencyToReducer from './currencyTo.js';
import listReducer from './fetchData.js'

export default configureStore({
    reducer: {
      rates: ratesReducer,
      currencyTo: currencyToReducer,
      list: listReducer,
    },
  });