import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectAllNotes } from "../slice/notes";

export const getNotes = (state: RootState) => state.notes
export const getFolder = (state: RootState) => state.folder
export const getApp = (state: RootState) => state.app

export const selectNotesByFolderId = createSelector(
    [selectAllNotes, (folderId: string) => folderId],
    (notes, folderId) => notes.filter((item) => item.folderId === folderId)
)

export const selectFilteredNotes = createSelector(
    (state: RootState) => selectAllNotes(state), 
    (state: RootState) => state.notes.activeFolderId, 
    (state: RootState) => state.notes.searchValue,
    (notes, activeFolderId, searchQuery) => {
      return notes.filter(note => {
        const isInFolder = activeFolderId ? note.folderId === activeFolderId : true;
        const matchesQuery = searchQuery ? note.content?.toString().toLowerCase().includes(searchQuery.toLowerCase()) : true;
        return isInFolder && matchesQuery;
      });
    }
  );