import { v4 } from "uuid";
import { NoteItem } from "../types";
import { LabelText } from "../label-text";
import { format } from "date-fns";

export const currentItem = format(new Date(), 'dd-MM-yyyy');
export const newNote = (title?: string): NoteItem => ({
  id: v4(),
  content: '',
  title: title || '',
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

// TODO : this helpers will be delete
export const getDayJsLocale = (languagetoken: string): string => {
  try {
    require('dayjs/locale/' + languagetoken + '.js')

    return languagetoken
  } catch (error) {
    if (languagetoken.includes('-'))
      return getDayJsLocale(languagetoken.substring(0, languagetoken.lastIndexOf('-')))

    return 'en'
  }
}

export const getNotesTitle = (title: string): string => {
  const noteText = title.trim().match(/[^#]{1,45}/)
  return noteText ? noteText[0].trim().split(/\r?\n/)[0] : LabelText.CREATE_NEW_NOTE
}
// TODO : this helpers will be delete
export const getDocumentName = (doctName: string) : string =>{
  const documentName = doctName.charAt(0).toUpperCase() + doctName.slice(1);
  return documentName;
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