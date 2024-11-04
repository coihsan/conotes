import { MenuType, NotesSortKey } from "../enums"
import { v4 } from "uuid";
import { Content } from "@tiptap/react";
import { EntityState } from "@reduxjs/toolkit";

export interface NoteItem {
  id: string,
  title: string,
  content: Content,
  createdAt: string,
  lastUpdated: string,
  tags?: TagItem[],
  trash: boolean,
  favorite: boolean,
  folder?: string,
  folderId?: string,
}

export interface FolderItem {
  id: string,
  name: string,
}

export interface FolderNotes {
  folderId: string,
  noteId: string
}
export interface FolderTags{
  noteId: string, 
  tagId: string
}

export interface TagItem {
  id: string,
  name: string,
  color: string,
}

export type ReactMouseEvent =
  | MouseEvent
  | React.MouseEvent<HTMLDivElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLInputElement>

export type ReactSubmitEvent = React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>

export interface NoteState extends EntityState<NoteItem, string> {
  activeFolderId : string
  activeNoteId: string
  activeTagsId: string
  searchValue: string
  loading: boolean
  error: null | string | undefined
  status?: 'idle' | 'pending' | 'succeeded' | 'rejected'
}

export interface FolderState {
  folder: FolderItem[]
  editingFolder :boolean
  loading: boolean
  error: null | string | undefined
  status?: 'idle' | 'pending' | 'succeeded' | 'rejected'
}

export interface TagsState {
  tags: TagItem[]
  activeTagsId: string
  loading: boolean
  error: null | string | undefined
}

export interface SettingsState {
  isOpen: boolean
  loading: boolean
  darkTheme: boolean
  notesSortKey: NotesSortKey
}

export interface AppState {
  menuToolbar: boolean;
  editable: boolean;
  activeMenu: MenuType;
  loading: boolean;
  activeFolderId: string;
  activeTagsId: string;
}

export interface RootState {
  appState: AppState;
  noteState: NoteState;
  folderState: FolderState;
  settingsState: SettingsState;
}

export const SET_ACTIVE_MENU = 'SET_ACTIVE_MENU';

interface SetActiveMenuAction {
  type: typeof SET_ACTIVE_MENU;
  payload: MenuType;
}

export type MenuActionTypes = SetActiveMenuAction;


export interface MenuState {
  activeMenu: MenuType;
}

