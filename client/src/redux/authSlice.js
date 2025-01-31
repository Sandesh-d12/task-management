import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    data:{},
    isAuthenticated: false,
    project:{},
    currentProject: "",
    },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload; //if action.payload holds some valid data, isAuthenticated will be set to true; otherwise, it will be false.
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
    setUser:(state, action) => {
      state.data = action.payload;
    },
    setProject:(state, action)=>{
      state.project = action.payload
    },
    setCurrentProject:(state, action)=>{
      state.currentProject = action.payload
    }
  },
});

export const { setToken, clearToken, setUser, setProject, setCurrentProject } = authSlice.actions;
export default authSlice.reducer;
