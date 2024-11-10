import Dexie, { Table } from 'dexie';
import { FolderItem, NoteItem, TagItem } from './types';


export class NulihApp extends Dexie {
  notes!: Table<NoteItem, string>;
  tags!: Table<TagItem, string>;
  folders!: Table<FolderItem, string>; 

  constructor() {
    super('nulihapp');
    this.version(1).stores({
      notes: '++id, content, title, createdAt, favorite, lastUpdated, trash, folderId',
      folders: '++id, name, icon, createdAt, lastUpdated',
      tags: '++id, name, color',
    });
  };
}

export const db = new NulihApp();