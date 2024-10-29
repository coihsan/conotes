import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoteItem, NoteState } from '@/lib/types'
import { v4 } from 'uuid';
import { currentItem } from '@/lib/utils/helpers';
import { createAppAsyncThunk } from '../thunk';
import { db } from '@/lib/db';
import { Content } from '@tiptap/core';
import { RootState } from '../store';

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
      name: "first tags",
      color: ''
    }
  ],
  favorite: true
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

export const getAllNotesThunk = createAppAsyncThunk(
  'notes/getAllNotes',
  async (_, { dispatch }) => {
    try {
      const notes: NoteItem[] = await db.notes.toArray();
      const sortedNotes = notes.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      dispatch(setNotes(sortedNotes));
    } catch (error) {
      console.error('Failed to fetch all notes', error);
      throw error;
    }
  }
);

export const getNotesContentByIDThunk = createAppAsyncThunk(
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

export const moveToTrashThunk = createAppAsyncThunk(
  'notes/deleteNotes',
  async (noteId: string, {dispatch, rejectWithValue}) => {
    try {
      await db.notes.update(noteId, { trash : true })
      dispatch(moveToTrash(noteId))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

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
  'note/deletePermanent',
  async (_, { rejectWithValue }) => {
    try {
      const allNotes = await db.notes.toArray();
      const notesToDelete = allNotes.filter(note => {
        return note.trash === true; 
      });
      const noteIdsToDelete = notesToDelete.map(note => note.id);
      await db.notes.bulkDelete(noteIdsToDelete);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);


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
    deleteEmptyTrash: (state, { payload } : PayloadAction<NoteItem[]>) => {
      const index = state.notes.find((state) => state.id);
      // todo create slice for this, i will be back
    }
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
    .addCase(getNotesContentByIDThunk.fulfilled, (state, action) => {
      state.activeNoteId = action.payload as string
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
    .addCase(deleteEmptyTrashThunk.fulfilled, (state, action) => {
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
  moveToTrash,
  setNotes,
} = notesSlice.actions

export default notesSlice.reducer