import { createSlice, PayloadAction, createEntityAdapter, Update } from '@reduxjs/toolkit'
import { NoteItem, NoteState } from '@/lib/types'
import { createAppAsyncThunk } from '../thunk';
import { db } from '@/lib/db';
import { Content } from '@tiptap/core';
import { RootState } from '../store';

export const notesAdapter = createEntityAdapter<NoteItem>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState: NoteState = notesAdapter.getInitialState({
  activeTagsId: '',
  activeFolderId: '',
  activeNoteId: '',
  searchValue: '',
  error: null,
  loading: true,
  status: 'pending',
})

export const updateContentThunk = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string; content: Content, title: string }>(
  'notes/updateContent',
  async (data, { rejectWithValue }) => {
    try {
      const existingNote = await db.notes.get(data.noteId);
      if (existingNote) {
        const updates: Partial<NoteItem> = {
          content: data.content,
          title: data.title,
          lastUpdated: new Date().toISOString(),
        };
        await db.notes.update(data.noteId, updates);
        return { id: data.noteId, changes: updates };
      } else {
        return rejectWithValue('updateContentThunk Note not found');
      }
    } catch (error) {
      console.error('Failed to update note content', error);
      return rejectWithValue(error as string);
    }
  }
);

export const addNewNote = createAppAsyncThunk(
  'notes/createNewNotes',
  async (note: NoteItem) => {
    try {
      const id = await db.notes.add({ ...note });
      return { ...note, id };
    } catch (error) {
      console.error('Failed to create note', error);
      throw error;
    }
  }
);

export const fetchAllNote = createAppAsyncThunk<NoteItem[], void, { rejectValue: string }>(
  'notes/fetchAllNotes',
  async (_, { rejectWithValue }) => {
    try {
      const notes = await db.notes.toArray();
      return notes;
    } catch (error) {
      console.log('Failed to fetch all notes');
      return rejectWithValue('Failed to fetch notes');
    }
  }
);

export const getActiveNote = createAppAsyncThunk(
  'notes/getActiveNote',
  async (noteId: string) => {
    try {
      const note = await db.notes.get(noteId);
      if (note) {
        return note.content;
      } else {
        throw new Error('getActiveNote not found');
      }
    } catch (error) {
      console.error('Error fetching note content:', error);
      throw error;
    }
  },
);

export const toggleTrashAction = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string; value: boolean }>(
  'notes/deleteNotes',
  async (data, { rejectWithValue }) => {
    try {
      const updates: Partial<NoteItem> = { trash: data.value };
      if (data.value) {
        updates.favorite = false;
      }
      await db.notes.update(data.noteId, updates);
      return { id: data.noteId, changes: updates };
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const markAsFavoriteThunk = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string; value: boolean }>(
  'notes/markFavorite',
  async (data, { rejectWithValue }) => {
    try {
      const updates : Partial<NoteItem> =  { favorite: data.value }
      if( data.value ) {
        updates.favorite = true
      }
      await db.notes.update(data.noteId, updates);
      return { id: data.noteId, changes: updates };
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
)

export const deleteEmptyTrashThunk = createAppAsyncThunk<string[], void, { rejectValue: string }>(
  'note/deleteEmpty',
  async (_, { rejectWithValue }) => {
    try {
      const allNotes = await db.notes.toArray();
      const notesToDelete = allNotes.filter(note => note.trash);
      const noteIdsToDelete = notesToDelete.map(note => note.id);
      await db.notes.bulkDelete(noteIdsToDelete);
      return noteIdsToDelete;
    } catch (error) {
      return rejectWithValue('error');
    }
  }
);


export const deletePermanentAction = createAppAsyncThunk<Update<NoteItem, string>, { noteId: string }, { rejectValue: string }>(
  'notes/deleteSingle',
  async (data, { rejectWithValue }) => {
    try {
      const notes = await db.notes.toArray();
      const notesToDelete = notes.find(note => note.id === data.noteId);
      
      if (notesToDelete) {
        const ids = notesToDelete.id;
        await db.notes.delete(ids);
        return { id: ids, changes: {} };
      } else {
        return rejectWithValue('deletePermanentAction Note not found');
      }
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

// =============================== SLICE ====================================

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    getActiveFolderId: (state, { payload }: PayloadAction<string>) => {
      state.activeFolderId = payload
    },
    searchQuery: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
  },
  // =============================== extraReducers ====================================
  extraReducers(builder) {
    builder
      // fetch notes
      .addCase(addNewNote.fulfilled, (state, action) => {
        notesAdapter.addOne(state, action.payload);
      })
      .addCase(fetchAllNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllNote.fulfilled, (state, action) => {
        if (action.payload) {
          notesAdapter.setAll(state, action.payload);
        } else {
          notesAdapter.setAll(state, []);
          state.error = 'Failed to fetch notes';
        }
        state.loading = false;
      })

      .addCase(fetchAllNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateContentThunk.fulfilled, (state, action) => {
        notesAdapter.updateOne(state, action.payload);
        state.status = 'succeeded';
        state.loading = false;
      })

      .addCase(updateContentThunk.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(updateContentThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
        state.loading = false;
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
      // handle favorite 
      .addCase(markAsFavoriteThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        notesAdapter.updateOne(state, action.payload)
      })
      // handle delete permantent
      .addCase(deletePermanentAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        notesAdapter.removeOne(state, action.payload.id)
      })
      // handle move to trash
      .addCase(toggleTrashAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        notesAdapter.updateOne(state, action.payload)
      })
      .addCase(toggleTrashAction.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(toggleTrashAction.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || null;
      })
      .addCase(deleteEmptyTrashThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        notesAdapter.removeMany(state, action.payload);
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
  searchQuery,
  getActiveFolderId
} = notesSlice.actions

export default notesSlice.reducer

export const {
  selectAll: selectAllNotes,
  selectById: selectNotesById,
} = notesAdapter.getSelectors((state: RootState) => state.notes)