import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice/app';
import notesReducer from './slice/notes';

export const store = configureStore({
  reducer: {
    app: appReducer,
    notes: notesReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
