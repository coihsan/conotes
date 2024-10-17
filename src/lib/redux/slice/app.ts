import { MenuType } from '@/lib/enums';
import { AppState } from '@/lib/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState : AppState = {
  editable: false,
  activeMenu: MenuType.NOTES,
  loading: false,
  menuToolbar: true
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setEditableEditor: (state, action) => {
      state.editable = action.payload;
    },
    setActiveMenu: (state, action: PayloadAction<MenuType>) => {
      state.activeMenu = action.payload;
    },
    setToggleEditor: (state, action) => {
      state.menuToolbar = action.payload;
    }
  },
});

export const { 
  setEditableEditor, 
  setActiveMenu,
  setToggleEditor
 } = appSlice.actions;
export default appSlice.reducer;
