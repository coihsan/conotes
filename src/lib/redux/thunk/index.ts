import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { useAppDispatch } from '../../../hooks/use-redux';
import { NoteItem } from '@/lib/types';
import { db } from '@/lib/db';
import { addNote, setActiveNoteContent, setNotes, updateNote } from '../slice/notes';
import { v4 as uuid } from 'uuid';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: typeof useAppDispatch
}>()

export const updateNotesThunk = createAsyncThunk(
  'notes/updateNotes',
  async (note: NoteItem, { dispatch }) => {
    try {
      const existingNote = await db.notes.get(note.id);
      if (existingNote) {
        await db.notes.put({ ...existingNote, content: note.content });
        dispatch(updateNote(note));
      } else {
        console.error(`Note ${note.id} not found.`);
      }
    } catch (error) {
      console.error('Failed to update note', error);
      throw error;
    }
  }
);

export const createNewNotesThunk = createAsyncThunk(
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

export const getAllNotes = createAsyncThunk(
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

export const getNotesContentByID = createAsyncThunk(
  'notes/getNotesContentByID',
  async (id: string, { dispatch }) => {
    try {
     const note: NoteItem | undefined = await db.notes.get(id);
      if (note) {
       dispatch(setActiveNoteContent(note.content));
      } else {
        console.error('Note not found');
      }
    } catch (error) {
      console.error('Failed to fetch note by ID', error);
      throw error;
    }
  }
);

export const saveNotes = createAsyncThunk(
  'notes/saveNotes',
  async(note : NoteItem, { dispatch }) => {
    try {
      await db.notes.put(note);
      dispatch(updateNote(note));
    } catch (error) {
      console.error('Failed to save note', error);
      throw error;
    }
  }
)