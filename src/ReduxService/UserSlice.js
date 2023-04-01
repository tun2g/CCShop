import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: { email: false,
    _id:false,
    avatar:false,
    },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setId: (state, action) => {
      state._id = action.payload;
    },
    setAvatar: (state,action)=>{
      state.avatar = action.payload
    }
  },
});

export const { setEmail,setId,setAvatar } = userSlice.actions;

export const selectId = createSelector(
    (state) => state.user._id,
    (_id) =>_id.toString() 
  );

export const selectEmail = createSelector(
    (state) => state.user.email,
    (email) => email
  );
export const selectAvatar = createSelector(
    (state) => state.user.avatar,
    (avatar) => avatar
  );


export default userSlice.reducer;