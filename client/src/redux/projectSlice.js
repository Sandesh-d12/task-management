import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'task',
  initialState: {
    data:[],
  },
  reducers: {
    setProjects:(state, action) => {
      state.data = action.payload;
    }
  },
});

export const { setProjects } = projectSlice.actions;
export default projectSlice.reducer;
