import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoteItem, NoteState } from '@/lib/types'
import { createAppAsyncThunk } from '../thunk';
import { db } from '@/lib/db';
import { Content } from '@tiptap/core';

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

export const updateContentThunk = createAppAsyncThunk(
  'notes/updateContent',
  async (
    data: { noteId: string; content: Content; title: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const existingNote = await db.notes.get(data.noteId);
      if (existingNote) {
        const updatedNote = {
          ...existingNote,
          content: data.content,
          title: data.title,
          lastUpdated: new Date().toISOString()
        };
        await db.notes.update(data.noteId, {content: data.content});
        dispatch(updateNoteContent(updatedNote))
        return updatedNote
      } else {
        return rejectWithValue('Note not found');
      }
    } catch (error) {
      console.error('Failed to update note content', error);
      return rejectWithValue(error);
    }
  }
);

export const createNewNotesThunk = createAppAsyncThunk(
  'notes/createNewNotes',
  async (note: NoteItem, { dispatch }) => {
    try {
      await db.notes.add({ ...note });
      dispatch(addNote({ ...note }));
    } catch (error) {
      console.error('Failed to create note', error);
      throw error;
    }
  }
);

export const fetchAllNote = createAppAsyncThunk(
  'notes/fetchAllNotes',
  async (_, {dispatch}) =>{
    try {
      const notes: NoteItem[] = await db.notes.toArray()
      dispatch(setNotes(notes))
    } catch (error) {
      console.log('Failed to fetch all notes')
    }
  }
)

export const getActiveNote = createAppAsyncThunk(
  'notes/getNotesContentByID',
  async (noteId: string) => {
    try {
      const note = await db.notes.get(noteId);
      if (note) {
        return note.content;
      } else {
        throw new Error('Note not found');
      }
    } catch (error) {
      console.error('Error fetching note content:', error);
      throw error;
    }
  },
);

export const toggleTrashAction = createAppAsyncThunk(
  'notes/deleteNotes',
  async (data: { noteId: string, value: boolean }, { dispatch, rejectWithValue }) => {
    try {
      const updates: Partial<NoteItem> = { trash: data.value }; 
      if (data.value) { 
        updates.favorite = false;
      }
      await db.notes.update(data.noteId, updates);
      dispatch(toggleTrashNotes(data.noteId));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const markAsFavoriteThunk = createAppAsyncThunk(
  'notes/markFavorite',
  async (data: {noteId: string, value: boolean}, {dispatch, rejectWithValue}) => {
    try {
      await db.notes.update(data.noteId, { favorite : data.value})
      dispatch(markAsFavorite(data.noteId))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

export const deleteEmptyTrashThunk = createAppAsyncThunk(
  'note/deleteEmpty',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const allNotes = await db.notes.toArray();
      const notesToDelete = allNotes.filter(note => {
        return note.trash === true; 
      });
      const noteIdsToDelete = notesToDelete.map(note => note.id);
      await db.notes.bulkDelete(noteIdsToDelete);
      dispatch(bulkDeleteFromTrash(notesToDelete))
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deletePermanentAction = createAppAsyncThunk(
  'notes/deleteSingle',
  async (noteId: string, {dispatch}) => {
    await db.notes.delete(noteId)
    dispatch(singleDeleteFromTrash(noteId))
  }
)

// =============================== SLICE ====================================
// =============================== SLICE ====================================

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, { payload }: PayloadAction<NoteItem>) => {
      state.notes.push(payload);
    },
    getNotesCount: (state) =>{
      state.notes.length
    },
    updateNoteContent: (state, action: PayloadAction<NoteItem>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    getActiveFolderId: (state, {payload} : PayloadAction<string>) => {
      state.activeFolderId = payload
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
    toggleTrashNotes: (state, { payload }: PayloadAction<string>) => {
      const note = state.notes.find((note) => note.id === payload);
      if (note) {
        note.trash = !note.trash;
        if (note.trash) { 
          note.favorite = false; 
        }
      }
    },
    bulkDeleteFromTrash: (state, { payload }: PayloadAction<NoteItem[]>) => {
      state.notes = state.notes.filter(note => !payload.some(deletedNote => deletedNote.id === note.id));
    },
    singleDeleteFromTrash: (state, { payload }: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== payload);
    },  

  },
  // =============================== extraReducers ====================================
  // =============================== extraReducers ====================================
  extraReducers(builder) {
    builder
    // fetch notes
    .addCase(fetchAllNote.fulfilled, (state) => {
      state.status = 'succeeded';
    })
    .addCase(updateContentThunk.fulfilled, (state, action: PayloadAction<{ id: string; content: Content; lastUpdated: string }>) => {
      const { id, content, lastUpdated } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.content = content;
        note.lastUpdated = lastUpdated;
      }
      state.status = 'succeeded';
      state.loading = false;
    })
    .addCase(updateContentThunk.pending, (state) => {
      state.status = 'pending',
      state.loading = true
    })
    .addCase(updateContentThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    })
    // get notes content by ID
    .addCase(getActiveNote.fulfilled, (state, action) => {
      state.activeNoteId = action.payload as string
      state.loading = true
      state.status = 'succeeded'
    })
    .addCase(getActiveNote.pending, (state) => {
      state.loading = true
    })
    .addCase(getActiveNote.rejected, (state, action) => {
      state.error = action.error.message
      state.loading = false
    })
    // handle move to trash
    .addCase(toggleTrashAction.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(toggleTrashAction.fulfilled, (state) => {
      state.status = 'succeeded';
    })
    .addCase(toggleTrashAction.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message || null;
    })
    .addCase(deleteEmptyTrashThunk.fulfilled, (state) => {
      state.loading = false;
      state.status = 'succeeded';
    })
    .addCase(deleteEmptyTrashThunk.rejected, (state) => {
      state.status = 'rejected';
    })
    .addCase(deleteEmptyTrashThunk.pending, (state) => {
      state.status = 'pending';
      state.loading = true
    })
  },
})
export const {
  addNote,
  updateNoteContent,
  searchQuery,
  markAsFavorite,
  toggleTrashNotes,
  setNotes,
  bulkDeleteFromTrash,
  singleDeleteFromTrash,
  getNotesCount,
  getActiveFolderId
} = notesSlice.actions

export default notesSlice.reducer