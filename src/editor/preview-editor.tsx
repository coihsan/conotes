import { useParams } from "react-router-dom"
import '../styles/editor.module.scss'
import NoteEditor from "./note-editor"
import { useEffect, useState } from "react"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@/lib/db"
import { Input } from "@/components/ui/input"
import { Loading } from "@/components/global/loading"
import HeaderEditor from "./header-editor"
import BreadcrumbNotes from "@/components/global/breadcrumb-notes"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux"
import { getNotesContentByID } from "@/lib/redux/thunk"
import { updateNote } from "@/lib/redux/slice/notes"

const PreviewEditor = () => {
    const { noteId } = useParams()
    const [loading, setLoading] = useState(true);
    
    const dispatch = useAppDispatch();
    const activeNoteContent = useAppSelector((state) => state.notes.activeNoteId);
    const getNotesData = useAppSelector((state) => state.notes.notes);
    const getNotesForCrumbs = getNotesData.find((note) => noteId === note.id)?.title || ''

    const handleUpdateNotes = (newContent :  string) => {
        dispatch(updateNote({id: noteId, content: newContent}))
        console.log('update notes')
    }

    useEffect(() => {
        if (noteId) {
          dispatch(getNotesContentByID(noteId)).then(() => {
            setLoading(false);
            console.log('getNotesContentByID:', getNotesForCrumbs);
          });
        }
      }, [noteId, dispatch, activeNoteContent]);


    return (
        <div className="h-full w-full border rounded-r-2xl bg-zinc-100 dark:bg-zinc-500/10 overflow-hidden">
            <div className="flex items-center justify-between w-full py-1 px-3 border-b-[1px]">
                <BreadcrumbNotes params={getNotesForCrumbs} />
                <HeaderEditor />
            </div>
            <NoteEditor onUpdate={handleUpdateNotes} contentNotes={activeNoteContent} />
        </div>
    )
}

export default PreviewEditor