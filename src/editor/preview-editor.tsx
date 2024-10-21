import { useParams } from "react-router-dom"
import '../styles/editor.module.scss'
import NoteEditor from "./note-editor"
import React, { useEffect, useState } from "react"
import { Loading } from "@/components/global/loading"
import BreadcrumbNotes from "@/components/global/breadcrumb-notes"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { getNotesContentByIDThunk, updateContentThunk } from "@/lib/redux/thunk"
import { currentItem, debounceEvent } from "@/lib/utils/helpers"
import { NoteItem } from "@/lib/types"
import { setEditableEditor } from "@/lib/redux/slice/app"
import HeaderEditor from "./header-editor"

const PreviewEditor: React.FC = () => {
  const { noteId } = useParams()
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const editable = useAppSelector((state) => state.app.editable);
  const activeNoteContent = useAppSelector((state) => state.notes.activeNoteId);
  const notes = useAppSelector((state) => state.notes.notes);
  const getNotesForCrumbs = notes.find((note) => noteId === note.id)?.content || ''

  const handleUpdateContent = debounceEvent((_content: string,) => {
     try {
       const updatedNotes: Pick<NoteItem, "content" | "lastUpdated"> = {
         content: _content,
         lastUpdated: currentItem
       }
       if (noteId) { 
         return dispatch(updateContentThunk({
           content: updatedNotes,
           noteId: noteId 
         }))
       } else {
         console.error("noteId is undefined. Cannot update content.");
       }
     } catch (error) {
       console.log(error)
     }
   }, 1000)

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
  }, [editable, dispatch]);

  if (loading) return <Loading />

  return (
    <div className="h-full w-full border rounded-r-2xl bg-zinc-100 dark:bg-zinc-500/10 overflow-hidden">
      <div className="flex items-center justify-between w-full py-1 px-3 border-b-[1px]">
        <BreadcrumbNotes params={getNotesForCrumbs} />
        <HeaderEditor />
      </div>
      <NoteEditor onChange={handleUpdateContent} contentNotes={activeNoteContent} />
    </div>
  )
}

export default PreviewEditor