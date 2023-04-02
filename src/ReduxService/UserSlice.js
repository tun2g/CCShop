import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: { email: false,
    _id:false,
    avatar:false,
    name:false
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
    },
    setName:(state,action)=>{
      state.username = action.payload
    }
  }
});

export const { setEmail,setId,setAvatar,setName } = userSlice.actions;

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
  export const selectName = createSelector(
    (state) => state.user.username,
    (avatar) => avatar
  );

export default userSlice.reducer;