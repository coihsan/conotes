import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoteItem, NoteState } from '@/lib/types'
import { getNotes, getNotesContentByID, updateNoteContent } from '../thunk';

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
    updateNote: (state, action: PayloadAction<Partial<NoteItem>>) => { 
      const { id, content, title } = action.payload; 
      const existingNotes = state.notes.find((note) => note.id === id);
      if(existingNotes){
        existingNotes.content = content || ''
        existingNotes.title = title || ''
      }
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
  extraReducers(builder) {
    builder
    // update notes
    .addCase(updateNoteContent.fulfilled, (state, action) =>{
      if(state.notes) return action.payload
      state.status = 'succeeded'
    })
    .addCase(updateNoteContent.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(updateNoteContent.rejected, (state, action) => {
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
      state.activeNoteId = action.payload
      state.loading = false
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
  updateNote,
  searchQuery,
  toggleFavorite,
  toggleTrash,
  setNotes,
  setActiveTagsId,
  setActiveNoteContent,
} = notesSlice.actions

export default notesSlice.reducer