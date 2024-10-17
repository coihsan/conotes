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

const PreviewEditor = () => {
    const { noteId } = useParams()
    const [loading, setLoading] = useState(true);
    
    const dispatch = useAppDispatch();
    const activeNoteContent = useAppSelector((state) => state.notes.activeNoteId);

    const notesLive = useLiveQuery(async () => await db.notes.toArray())
    const notesMap = notesLive?.find((note) => noteId === note.id)
    const contentLive = notesMap ? notesMap?.title : 'null'

    useEffect(() => {
        if (noteId) {
          dispatch(getNotesContentByID(noteId));
        }
      }, [noteId, dispatch]);

    useEffect(() => {
        if (contentLive) {
            setLoading(false);
        }
    }, [contentLive, notesMap]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="h-full w-full border rounded-r-2xl bg-zinc-100 dark:bg-zinc-500/10 overflow-hidden">
            <div className="flex items-center justify-between w-full py-1 px-3 border-b-[1px]">
                <BreadcrumbNotes params={contentLive} />
                <HeaderEditor />
            </div>
            <NoteEditor contentNotes={activeNoteContent} />
        </div>
    )
}

export default PreviewEditor