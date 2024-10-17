export enum NotesSortKey {
    LAST_UPDATED = 'lastUpdated',
    TITLE = 'title',
    CREATED_DATE = 'created_date',
  }

  export enum NoteStatus {
    Active,
    Trashed,
    Archived,
}

export enum MenuType {
  NOTES = 'NOTES',
  TAGS = 'TAGS',
  FOLDER = "FOLDER",
  FAVORITE = 'FAVORITE',
  TRASH = 'TRASH',
  SETTINGS = 'SETTINGS',
  ACCOUNT = 'ACCOUNT',
}