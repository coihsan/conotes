import { createAsyncThunk } from '@reduxjs/toolkit';
import { NoteItem } from '@/lib/types';
import { db } from '@/lib/db';
import { addNote, setNotes, updateNoteContent } from '../slice/notes';
import type { RootState, AppDispatch } from '../store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>()

// THUNK

export const updateContentThunk = createAppAsyncThunk(
  'notes/updateContent',
  async (data: { noteId: string, content: string, title: string }, { dispatch }) => {
    try {
      const existingNote = await db.notes.get(data.noteId); 
      
      if (existingNote) {
        const updatedNote = { 
          ...existingNote, 
          content: data.content, 
          title: data.title,
          lastUpdated: new Date().toISOString() 
        };
        await db.notes.put(updatedNote);
        dispatch(updateNoteContent(updatedNote));
      } else {
        throw new Error('Note not found');
      }
    } catch (error) {
      console.error('Failed to update note content', error);
      throw error;
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

