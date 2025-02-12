import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { exampleApi } from '@/lib/services/api';
import counterReducer from './features/counterSlice';
import uploadedDataReducer from './features/uploadedDataSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    uploadedData: uploadedDataReducer, 
    [exampleApi.reducerPath]: exampleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exampleApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
