import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    data:{},
    isAuthenticated: false,
  },
  reducers: {
    setToken: (state, action) => {
      console.log('state',state)
      state.token = action.payload;
      state.isAuthenticated = !!action.payload; //if action.payload holds some valid data, isAuthenticated will be set to true; otherwise, it will be false.
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
    setUser:(state, action) => {
      state.data = action.payload;
    }
  },
});

export const { setToken, clearToken, setUser } = authSlice.actions;
export default authSlice.reducer;