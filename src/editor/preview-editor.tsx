import { useParams } from "react-router-dom"
import '../styles/editor.module.scss'
import NoteEditor from "./note-editor"
import React, { useEffect, useState } from "react"
import { Loading } from "@/components/global/loading"
import BreadcrumbNotes from "@/components/global/breadcrumb-notes"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { getNotesContentByIDThunk, updateContentThunk } from "@/lib/redux/thunk"
import { debounceNotes } from "@/lib/utils/helpers"
import { setEditableEditor } from "@/lib/redux/slice/app"
import HeaderEditor from "./header-editor"
import { RootState } from "@/lib/redux/store"
import { NoteItem } from "@/lib/types"

const PreviewEditor: React.FC = () => {
  const { noteId } = useParams()
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const editable = useAppSelector((state) => state.app.editable);
  const activeNoteContent = useAppSelector((state) => state.notes.activeNoteId);
  const notes = useAppSelector((state : RootState) => state.notes.notes);
  const getNotesForCrumbs = notes.find((note) => noteId === note.id)?.content || ''

  const handleSave = debounceNotes((content : NoteItem) => {}, 1000)

  // handle change notes
  const handleUpdateContent = debounceNotes((content: string) => {
    if (noteId) { 
      dispatch(updateContentThunk({
        noteId, 
        content 
      }));
    } else {
      console.error("noteId is undefined. Cannot update content.");
    }
  }, 1000);

  useEffect(() => {
    if (noteId) {
      dispatch(getNotesContentByIDThunk(noteId)).then(() => {
        setLoading(false)
      })
    }
  }, [noteId, dispatch]);

  useEffect(() => {
    if (editable) {
      dispatch(setEditableEditor(true));
    }
  }, [editable, dispatch, activeNoteContent]);

  if (loading) return <Loading />

  return (
    <div className="h-full w-full border rounded-r-2xl bg-zinc-100 dark:bg-zinc-500/10 overflow-hidden">
      <div className="flex items-center justify-between w-full py-1 px-3 border-b-[1px]">
        <BreadcrumbNotes params={getNotesForCrumbs.toString()} />
        <HeaderEditor />
      </div>
      <NoteEditor 
      onChange={handleUpdateContent} 
      contentNotes={activeNoteContent} />
    </div>
  )
}

export default PreviewEditor