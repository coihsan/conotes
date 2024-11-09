import { v4 } from "uuid";
import { NoteItem } from "../types";
import { LabelText } from "../label-text";
import { format } from "date-fns";
import { Content } from "@tiptap/react";
import { useAppSelector } from "../hooks/use-redux";
import { selectAllNotes } from "../redux/slice/notes";

export const currentItem = format(new Date(), 'dd-MM-yyyy');
export const newNote = (): NoteItem => ({
  id: v4(),
  content: '',
  title: '',
  createdAt: currentItem,
  lastUpdated: currentItem,
  trash: false,
  favorite: false,
  folderId: v4(),
})

export const copyToClipboard = (noteId: string, content: string) => {
  if (noteId) {
    navigator.clipboard.writeText(content)
  } else{
    console.log('Failed copy to clipboard')
  }
}

export const extractTextFromHTML = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

export const getNotesTitle = (title: Content) : string => {
  const titles = title?.toString()
  const noteText = titles?.trim().match(/[^#]{1,55}/)
  return noteText ? extractTextFromHTML(noteText[0]).trim().split(/\r?\n/)[0] : LabelText.CREATE_NEW_NOTE
}

export const debounceEvent = <T extends Function>(cb: T, wait = 20) => {
  let h = 0
  const callable = (...args: any) => {
    clearTimeout(h)
    h = window.setTimeout(() => cb(...args), wait)
  }

  return <T>(<any>callable)
}

export const getActiveNote = (notes : NoteItem[], activeNoteId: string) => {
  notes.find((note) => note.id === activeNoteId)
}

export const getContrastColor = (hexColor: string) : string => {
  const r = parseInt(hexColor?.slice(1, 3), 16)
  const g = parseInt(hexColor?.slice(3, 5), 16)
  const b = parseInt(hexColor?.slice(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#000000" : "#FFFFFF"
}

export const getTitleHead = (activeNoteId: string) => {
  const getTitle = getNotesTitle(activeNoteId)
  
  if( getTitle ){
    return `${getTitle} / Conotes`
  } else {
    return 'Conotes'
  }
}

export const useNoteTitle = (noteId: string) => { 
  const notes = useAppSelector((state) => selectAllNotes(state)); 
  const note = notes.find((note) => note.id === noteId); 
  return note ? note.content : ''; 
};


export const getTotalNotesInFolder = (notes: NoteItem[], folderId: string): number => {
  return notes.filter((note) => note.folderId === folderId && !note.trash).length;
}
