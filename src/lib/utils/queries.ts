import { db } from '@/lib/db'

export const getNotesContentByIdFromDB = async (noteId: string) =>{
    const notes = await db.notes.toArray()
    const notesById = notes?.find((note) => note.id === noteId)
    if (notesById) return notesById.content
}