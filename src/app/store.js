import { configureStore } from '@reduxjs/toolkit';
import workerReducer from '../features/WORKERS/workerSlice';
import studentReducer from '../features/WORKERS/studentsSlice';

export const store = configureStore({
  reducer: {
    worker: workerReducer,
    student:studentReducer
  },
});
