import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoteItem, NoteState } from '@/lib/types'
import { fetchAllNote, getAllNotesThunk, getNotesContentByIDThunk, updateContentThunk } from '../thunk';

const initialState: NoteState = {
  notes: [],
  activeTagsId: '',
  activeFolderId: '',
  activeNoteId: '',
  searchValue: '',
  error: null,
  loading: true,
  status: 'pending',
}

const firstNotes = {}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, { payload }: PayloadAction<NoteItem>) => {
      state.notes.push(payload);
    },
    updateNoteContent: (state, action: PayloadAction<NoteItem>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
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
    // get notes
    .addCase(getAllNotesThunk.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(getAllNotesThunk.fulfilled, (state, action) => {
      if(state.notes) return action.payload
      state.status = 'succeeded'
    })
    .addCase(getAllNotesThunk.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message
    })
    // fetch notes
    .addCase(fetchAllNote.fulfilled, (state, action) => {
      state.status = 'succeeded';
    })
    .addCase(updateContentThunk.fulfilled, (state, action) => {
      state.status = 'succeeded'
    })
    // get notes content by ID
    .addCase(getNotesContentByIDThunk.fulfilled, (state, action) => {
      state.activeNoteId = action.payload.content?.slice
      state.loading = true
      state.status = 'succeeded'
    })
    .addCase(getNotesContentByIDThunk.pending, (state) => {
      state.loading = true
    })
    .addCase(getNotesContentByIDThunk.rejected, (state, action) => {
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