import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoteItem, NoteState } from '@/lib/types'

const initialState: NoteState = {
  notes: [],
  activeTagsId: '',
  activeNoteId: '',
  searchValue: '',
  error: null,
  loading: true,
  status: 'pending',
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, { payload }: PayloadAction<NoteItem>) => {
      state.notes.push(payload);
    },
    updateNote: (state, { payload }: PayloadAction<NoteItem>) => {
      state.notes = state.notes.map((note) =>
        note.id === payload.id
          ? { ...note, content: payload.content, lastUpdated: payload.lastUpdated }
          : note
      )
    },
    saveNotes : (state, {payload} : PayloadAction<NoteItem[]>) => {
      state.notes = payload
    },
    setActiveNoteContent: (state, { payload }: PayloadAction<string>) => {
      state.activeNoteId = payload;
    },
    setNotes: (state, { payload }: PayloadAction<NoteItem[]>) => {
      state.notes = payload;
    },
    setActiveTagsId: (state, { payload }: PayloadAction<string>) => {
      state.activeTagsId = payload;
    },
    searchQuery : (state, {payload} : PayloadAction<string>) =>{
      state.searchValue = payload
    },
    toggleFavorite: (state, { payload }: PayloadAction<string>) => {
      const note = state.notes.find((note) => note.id === payload)
      if (note) {
        note.favorite = !note.favorite
      }
    },
    toggleTrash: (state, { payload }: PayloadAction<string>) => {
      const note = state.notes.find((note) => note.id === payload)
      if (note) {
        note.trash = !note.trash
      }
    },
  },

})
export const {
  addNote,
  updateNote,
  searchQuery,
  toggleFavorite,
  toggleTrash,
  setNotes,
  setActiveTagsId,
  setActiveNoteContent,
} = notesSlice.actions

export default notesSlice.reducer