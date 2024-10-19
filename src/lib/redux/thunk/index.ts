import { createAsyncThunk } from '@reduxjs/toolkit';
import { NoteItem } from '@/lib/types';
import { db } from '@/lib/db';
import { addNote, setNotes, updateNoteContent } from '../slice/notes';
import type { RootState, AppDispatch } from '../store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()

export const getNotes = createAppAsyncThunk(
  'notes/getNotes',
  async (_, { dispatch }) => {
    try {
      const notes = await db.notes.toArray();
      dispatch(setNotes(notes));
    } catch (error) {
      console.error('Failed to fetch notes', error);
      throw error;
    }
  }
);

export const updateNoteContentThunk = createAppAsyncThunk(
  'notes/updateNoteContent',
  async (note: NoteItem, { dispatch }) => {
    try {
      const existingNote = await db.notes.get(note.id);

      if (existingNote) {
        await db.notes.put(note);
        dispatch(updateNoteContent(note));
      } else {
        console.error(`Note with ID ${note.id} not found.`);
      }
    } catch (error) {
      console.error('Failed to update note', error);
      throw error;
    }
  }
);

export const createNewNotesThunk = createAppAsyncThunk(
  'notes/createNewNotes',
  async (note: NoteItem, { dispatch }) => {
    try {
      await db.notes.add({ ...note});
      dispatch(addNote({ ...note}));
    } catch (error) {
      console.error('Failed to create note', error);
      throw error;
    }
  }
);

export const getAllNotesThunk = createAppAsyncThunk(
  'notes/getAllNotes',
  async (_, { dispatch }) => {
    try {
      const notes: NoteItem[] = await db.notes.toArray();
      const sortedNotes = notes.sort((a, b) => a.title.localeCompare(b.title));
      dispatch(setNotes(sortedNotes));
    } catch (error) {
      console.error('Failed to fetch all notes', error);
      throw error;
    }
  }
);

export const getNotesContentByID = createAppAsyncThunk(
  'notes/getNotesContentByID',
  async (noteId: string, { dispatch }) => {
    try {
      const note = await db.notes.get(noteId);
      if (note) {
        dispatch(updateNoteContent(note));
        return note;
      } else {
        throw new Error('Note not found');
      }
    } catch (error) {
      console.error('Error fetching note content:', error);
      throw error;
    }
  },
);

export const saveNotesContentThunk = createAppAsyncThunk(
  'notes/saveNotes',
  async(note : NoteItem, { dispatch }) => {
    try {
      await db.notes.put(note);
      dispatch(updateNoteContent(note));
    } catch (error) {
      console.error('Failed to save note', error);
      throw error;
    }
  }
)