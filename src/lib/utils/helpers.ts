import { v4 } from "uuid";
import { NoteItem, TagItem } from "../types";
import dayjs from "dayjs";
import { LabelText } from "../label-text";

export const newNote = (title?: string): NoteItem => ({
  id: v4(),
  content: '',
  title: title || '',
  createdAt: dayjs().format(),
  lastUpdated: dayjs().format(),
  trash: false,
  tags: [],
  favorite: false,
  folderId: v4(),
  pinned: false,
  folder: 'Notes'
})


export const copyToClipboard = (content: string) => {
  navigator.clipboard.writeText(content)
}

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