import { v4 } from "uuid";
import { NoteItem } from "../types";
import { LabelText } from "../label-text";
import { format } from "date-fns";
import { Node } from "@tiptap/pm/model";
import { Content } from "@tiptap/core";

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

export const copyToClipboard = (content: string) => {
  navigator.clipboard.writeText(content)
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

export const debounceNotes = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

export const getActiveNote = (notes : NoteItem[], activeNoteId: string) => {
  notes.find((note) => note.id === activeNoteId)
}