import { combineReducers, Reducer } from 'redux'
import notesReducer from "./notes";
import appReducer from "./app";
import folderReducer from "./folder"
import { RootState } from '@/lib/types';

const rootReducer: Reducer<RootState> = combineReducers({
    appState: appReducer,
    notesState: notesReducer,
    foldersState: folderReducer,
  });
  
  export default rootReducer;