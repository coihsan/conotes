import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice/app';
import notesReducer from './slice/notes';
import folderReducer from './slice/folder';

export const store = configureStore({
  reducer: {
    app: appReducer,
    notes: notesReducer,
    folder: folderReducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
