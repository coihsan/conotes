import { useParams } from "react-router-dom"
import '../styles/editor.module.scss'
import NoteEditor from "./note-editor"
import React, { useEffect, useState } from "react"
import { Loading } from "@/components/global/loading"
import HeaderEditor from "./header-editor"
import BreadcrumbNotes from "@/components/global/breadcrumb-notes"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { getNotesContentByIDThunk } from "@/lib/redux/thunk"
import { currentItem, debounceEvent } from "@/lib/utils/helpers"
import { HTMLContent } from "@tiptap/core"
import { updateNoteContent } from "@/lib/redux/slice/notes"
import { NoteItem } from "@/lib/types"

const PreviewEditor: React.FC = () => {
  const { noteId } = useParams()
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const activeNoteContent = useAppSelector((state) => state.notes.activeNoteId);
  const notes = useAppSelector((state) => state.notes.notes);
  const getNotesForCrumbs = notes.find((note) => noteId === note.id)?.title || ''

  const handleUpdateNotes = debounceEvent((content: HTMLContent) => {
    const updatedNote: Partial<NoteItem> = {
      content: content,
      lastUpdated: currentItem,
    };
    return dispatch(updateNoteContent(updatedNote));
  });

  useEffect(() => {
    if (noteId) {
      dispatch(getNotesContentByIDThunk(noteId)).then(() => {
        setLoading(false);
      });
    }
  }, [noteId, dispatch]);

  if (loading) return <Loading />

  return (
    <div className="h-full w-full border rounded-r-2xl bg-zinc-100 dark:bg-zinc-500/10 overflow-hidden">
      <div className="flex items-center justify-between w-full py-1 px-3 border-b-[1px]">
        <BreadcrumbNotes params={getNotesForCrumbs} />
        <HeaderEditor />
      </div>
      <NoteEditor onChange={handleUpdateNotes} contentNotes={activeNoteContent} />
    </div>
  )
}

export default PreviewEditor