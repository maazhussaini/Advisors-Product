import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadedDataState {
  data: any | null;
}

const initialState: UploadedDataState = {
  data: null,
};

const uploadedDataSlice = createSlice({
  name: 'uploadedData',
  initialState,
  reducers: {
    setUploadedData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    clearUploadedData: (state) => {
      state.data = null;
    },
  },
});

export const { setUploadedData, clearUploadedData } = uploadedDataSlice.actions;
export default uploadedDataSlice.reducer;
