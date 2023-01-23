import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWorkers,addWorker, delWorker,updWorker } from './workerAPI';

const initialState = {
  workers:[],
  update:false
};

export const getWorkersAsync = createAsyncThunk(
  'worker/getWorkers',
  async () => {
    const response = await getWorkers();
    return response;
  }
);

export const delWorkerAsync = createAsyncThunk(
    'worker/delWorker',
    async (email) => {
        console.log(email)
      const response = await delWorker(email);
      return response;
    }
  );

export const addWorkerAsync = createAsyncThunk(
    'worker/addWorker',
    async (worker) => {
      const response = await addWorker(worker);
      console.log("addWorkerAsync!")
      return response;
    }
  );

  export const UpdWorkersAsync = createAsyncThunk(
    'worker/updWorker',
    async (worker) => {
      const response = await updWorker(worker);
      return response;
    }
  );

export const workerSlice = createSlice({
  name: 'worker',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkersAsync.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.workers = action.payload.data;        
      })
      .addCase(addWorkerAsync.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.workers.push ( action.payload.data);
      })
      .addCase(delWorkerAsync.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.workers=state.workers.filter (wor =>  wor.email !== action.payload.data.message);
         console.log(state.students)
      })
      .addCase(UpdWorkersAsync.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.update =! state.update
      });
  },
});

// export const {  } = workerSlice.actions;
export const selectWorkers = (state) => state.worker.workers;
export const selectUpdate = (state) => state.worker.update;
export default workerSlice.reducer;
