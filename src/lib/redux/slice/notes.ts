import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoteItem, NoteState } from '@/lib/types'
import { fetchAllNote, getAllNotesThunk, getNotesContentByIDThunk, moveToTrashThunk, updateContentThunk } from '../thunk';
import { v4 } from 'uuid';
import { currentItem } from '@/lib/utils/helpers';

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

const firstNotes : NoteItem = {
  id: v4(),
  content: `<h1>This is to be title</h1>`,
  createdAt: currentItem,
  lastUpdated: currentItem,
  trash: false,
  folder: 'Notes',
  tags: [
    {
      id: v4(),
      name: "first tags"
    }
  ],
  favorite: true
}

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
    setNotes: (state, { payload }: PayloadAction<NoteItem[]>) => {
      state.notes = payload;
    },
    searchQuery : (state, {payload} : PayloadAction<string>) =>{
      state.searchValue = payload
    },
    markAsFavorite: (state, { payload }: PayloadAction<string>) => {
      const note = state.notes.find((note) => note.id === payload)
      if (note) {
        note.favorite = !note.favorite
      }
    },
    moveToTrash: (state, { payload }: PayloadAction<string>) => {
      const note = state.notes.find((note) => note.id === payload)
      if (note) {
        note.trash = !note.trash
      }
    },
    // deleteEmptyTrash: ( state, { payload } : PayloadAction<string[]> ) =>{
    //   state.notes.filter((note) => note.id === payload.reduce(state))
    // }
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
      state.activeNoteId = action.payload.content
      state.loading = true
      state.status = 'succeeded'
    })
    .addCase(getNotesContentByIDThunk.pending, (state) => {
      state.loading = true
    })
    .addCase(getNotesContentByIDThunk.rejected, (state, action) => {
      state.error = action.error.message
      state.loading = false
    })
    // handle move to trash
    .addCase(moveToTrashThunk.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(moveToTrashThunk.fulfilled, (state) => {
      state.status = 'succeeded';
    })
    .addCase(moveToTrashThunk.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message || null;
    })
  },
})
export const {
  addNote,
  updateNoteContent,
  searchQuery,
  markAsFavorite,
  moveToTrash,
  setNotes,
} = notesSlice.actions

export default notesSlice.reducer