// action - state management
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cost: 0,
  client: 0,
  neighbours: []
};
// ==============================|| SLICE - QUOTES ||============================== //

const quotes = createSlice({
  name: 'quotes',
  initialState: initialState,
  reducers: {
    quotesAmmount(state, action) {
      const { cost, client, neighbours } = action.payload;
      state.cost = cost;
      state.client = client;
      state.neighbours = neighbours;
    }
  }
});

export default quotes.reducer;

export const { quotesAmmount } = quotes.actions;
