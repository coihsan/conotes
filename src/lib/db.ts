import Dexie, { Table } from 'dexie';
import { NoteItem } from './types';

export class ConotesApp extends Dexie {
  notes!: Table<NoteItem, string>;

  constructor() {
    super('conotes');
    this.version(1).stores({
      notes: '++id, content, title, createdAt, favorite, lastUpdated, pinned, trash, *tags, *folderId',
    });
  };
}

export const db = new ConotesApp();