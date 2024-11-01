import Dexie, { Table } from 'dexie';
import { FolderItem, NoteItem, TagItem } from './types';

export class ConotesApp extends Dexie {
  notes!: Table<NoteItem, string>;
  tags!: Table<TagItem, string>;
  folders!: Table<FolderItem, string>; 
  folderNotes!: Table<{ folderId: string, noteId: string }, string>; 
  folderTags!: Table<{ noteId: string, tagId: string }, string>; 

  constructor() {
    super('conotes');
    this.version(1).stores({
      notes: '++id, content, createdAt, favorite, lastUpdated, trash, *folderId',
      tags: '++id, name, color',
      folders: '++id, name, icon, createdAt, lastUpdated',
      folderNotes: '[folderId+noteId], folderId, noteId',
      folderTags: '[noteId+tagId], noteId, tagId'
    });
  };
}

export const db = new ConotesApp();