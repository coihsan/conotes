import Dexie, { Table } from 'dexie';
import { FolderItem, FolderNotes, FolderTags, NoteItem, TagItem } from './types';


export class ConotesApp extends Dexie {
  notes!: Table<NoteItem, string>;
  tags!: Table<TagItem, string>;
  folders!: Table<FolderItem, string>; 
  folderNotes!: Table<FolderNotes, string>; 
  folderTags!: Table<FolderTags, string>; 

  constructor() {
    super('conotes');
    this.version(1).stores({
      notes: '++id, content, title, createdAt, favorite, lastUpdated, trash, *folderId',
      folders: '++id, name, icon, createdAt, lastUpdated',
      folderNotes: '[folderId+noteId], folderId, noteId',
      tags: '++id, name, color',
      folderTags: '[noteId+tagId], noteId, tagId'
    });
  };
}

export const db = new ConotesApp();