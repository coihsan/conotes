import { v4 } from "uuid";
import { NoteItem } from "../types";
import { LabelText } from "../label-text";
import { format } from "date-fns";
import { Content, Editor } from "@tiptap/core";

export const currentItem = format(new Date(), 'dd-MM-yyyy');
export const newNote = (): NoteItem => ({
  id: v4(),
  content: '',
  createdAt: currentItem,
  lastUpdated: currentItem,
  trash: false,
  tags: [],
  favorite: false,
  folderId: v4(),
  folder: 'Notes'
})

export const copyToClipboard = (noteId: string, content: string) => {
  if (noteId) {
    navigator.clipboard.writeText(content)
  } else{
    console.log('Failed copy to clipboard')
  }
}

export const getNotesTitle = (title: Content) : string => {
  const titles = title?.toString()
  const noteText = titles?.trim().match(/[^#]{1,45}/)
  return noteText ? noteText[0].trim().split(/\r?\n/)[0] : LabelText.CREATE_NEW_NOTE
}

export const debounceEvent = <T extends Function>(cb: T, wait = 20) => {
  let h = 0
  const callable = (...args: any) => {
    clearTimeout(h)
    h = window.setTimeout(() => cb(...args), wait)
  }

  return <T>(<any>callable)
}

// export const debounceNotes = (func: Function, wait: number) => {
//   let timeout: NodeJS.Timeout;
//   return (...args: any[]) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// };

export const getActiveNote = (notes : NoteItem[], activeNoteId: string) => {
  notes.find((note) => note.id === activeNoteId)
}

export function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor?.slice(1, 3), 16)
  const g = parseInt(hexColor?.slice(3, 5), 16)
  const b = parseInt(hexColor?.slice(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#000000" : "#FFFFFF"
}