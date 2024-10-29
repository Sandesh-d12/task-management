import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    data:[],
  },
  reducers: {
    setTasks:(state, action) => {
        console.log(state, action.payload)
      state.data = action.payload;
    }
  },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
