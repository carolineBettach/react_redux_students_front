import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStudents,addStudent } from './studentsAPI';

const initialState = {
  students:[],
  update:false
};

export const getStudenstAsync = createAsyncThunk(
  'student/getStudents',
  async () => {
    const response = await getStudents();
    return response;
  }
);

export const addNewStudentAsync = createAsyncThunk(
    'student/addStudent',
    async (student) => {
      const response = await addStudent(student);
      return response;
    }
  );

export const studentsSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudenstAsync.fulfilled, (state, action) => {
        console.log("!!!!Please")
        console.log(action.payload.data)
        state.students = action.payload.data;
      })
      .addCase(addNewStudentAsync.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.workers.push ( action.payload.data);
      }) ;
  },
});

export const {  } = studentsSlice.actions;
export const selectStudents = (state) => state.student.students;
export const selectStudentUpdate = (state) => state.student.update;
export default studentsSlice.reducer;
