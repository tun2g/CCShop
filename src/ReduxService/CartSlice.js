import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalQuantity: 0
  },
  reducers: {
    updateTotalQuantity(state, action) {
        state.totalQuantity += action.payload;
    },
    initTotalQuantity(state,action){
        state.totalQuantity=action.payload
    }
  }
});

export const { updateTotalQuantity,initTotalQuantity } = cartSlice.actions;


export const selectTotalQuantity = createSelector(
    (state) => state.cart.totalQuantity,
    (totalQuantity) => totalQuantity 
  );

export default cartSlice.reducer;