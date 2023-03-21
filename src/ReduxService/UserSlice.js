import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: { email: false },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = userSlice.actions;
export const selectEmail = createSelector(
    (state) => state.user.email,
    (email) => email
  );
export default userSlice.reducer;