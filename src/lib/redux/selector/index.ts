import { RootState } from "../store";
// this selector will be delete
export const selectAllNotes = (state: RootState) => state.notes.notes
export const selectNotesById = ( state : RootState, noteId: string) => state.notes.notes.find((note) => note.id === noteId)