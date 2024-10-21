import { MenuType, NotesSortKey } from "../enums"
import { v4 } from "uuid";
import sync from "../redux/slice/sync";

export interface NoteItem {
  id: string
  title: string
  content: string
  createdAt: string
  lastUpdated: string
  tags?: TagItem[]
  trash: boolean
  favorite: boolean
  folder?: string
  folderId?: string
}

export interface FolderItem {
  id: string
  name: string
  icon?: string
}

export interface TagItem {
  id: string
  name: string,
  color?: String
}

export interface Visitor {
  id: typeof v4
  name: string
  avatar?: string
  isOnline: boolean
}

export type ReactMouseEvent =
  | MouseEvent
  | React.MouseEvent<HTMLDivElement>
  | React.ChangeEvent<HTMLSelectElement>

export type ReactSubmitEvent = React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>

export interface NoteState {
  notes: NoteItem[]
  activeFolderId : string
  activeNoteId: string
  activeTagsId: string
  error: null | string | undefined
  loading: boolean
  searchValue: string
  status?: 'idle' | 'pending' | 'succeeded' | 'rejected'
}

export interface SettingsState {
  isOpen: boolean
  loading: boolean
  darkTheme: boolean
  notesSortKey: NotesSortKey
}

export interface AppState {
  menuToolbar: boolean;
  editable: boolean
  activeMenu: MenuType
  loading: boolean
}

export interface RootState {
  appState: AppState;
  noteState: NoteState;
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

export interface SynchronizeState {
  sync: boolean,
  pendingSync: boolean,
  lastSync: string,
  error: string
}
export interface SynchronizePayload {
  folder: FolderItem[],
  notes: NoteItem[],
}
export interface SyncAction {
  type: typeof sync.prototype
  payload: SynchronizePayload
}