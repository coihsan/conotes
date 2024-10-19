import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoteItem, NoteState } from '@/lib/types'
import { getNotes, getNotesContentByID, updateNoteContentThunk } from '../thunk';

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
    updateNoteContent: (state, { payload }: PayloadAction<NoteItem>) => {
      state.notes = state.notes.map((note) =>
        note.id === payload.id
          ? { ...note, content: payload.content, lastUpdated: payload.lastUpdated }
          : note
      )
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
  extraReducers(builder) {
    builder
    // update notes
    .addCase(updateNoteContentThunk.fulfilled, (state, action) =>{
      if(state.notes) return action.payload
      state.status = 'succeeded'
    })
    .addCase(updateNoteContentThunk.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(updateNoteContentThunk.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message
    })
    // get notes
    .addCase(getNotes.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(getNotes.fulfilled, (state, action) => {
      if(state.notes) return action.payload
      state.status = 'succeeded'
    })
    .addCase(getNotes.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message
    })
    // get notes content by ID
    .addCase(getNotesContentByID.fulfilled, (state, action) => {
      state.activeNoteId = action.payload.content
      state.loading = true
      state.status = 'succeeded'
    })
    .addCase(getNotesContentByID.pending, (state) => {
      state.loading = true
    })
    .addCase(getNotesContentByID.rejected, (state, action) => {
      state.error = action.error.message
      state.loading = false
    });
  },
})
export const {
  addNote,
  updateNoteContent,
  searchQuery,
  toggleFavorite,
  toggleTrash,
  setNotes,
  setActiveTagsId,
  setActiveNoteContent,
} = notesSlice.actions

export default notesSlice.reducer