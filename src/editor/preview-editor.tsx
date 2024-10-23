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
import { NoteItem } from "@/lib/types"
import { HTMLContent } from "@tiptap/core"

const PreviewEditor: React.FC = () => {
  const { noteId } = useParams()
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const editable = useAppSelector((state) => state.app.editable);
  const activeNoteContent = useAppSelector((state) => state.notes.activeNoteId);

  const handleSave = debounceNotes((content : NoteItem) => {}, 1000)

  // handle change notes
  const handleUpdateContent = (content: HTMLContent, title: string) => {
    if (noteId) { 
      dispatch(updateContentThunk({
        noteId, 
        content,
        title
      }));
    } else {
      console.error("noteId is undefined. Cannot update content.");
    }
  };

  useEffect(() => {
    if (noteId) {
      dispatch(getNotesContentByIDThunk(noteId)).then(() => {
        setLoading(false);
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
    <div className="h-full w-full border rounded-r-2xl">
      <div className="flex items-center justify-between w-full py-1 px-3 border-b-[1px]">
        <BreadcrumbNotes />
        <HeaderEditor />
      </div>
          <NoteEditor 
          onChange={handleUpdateContent} 
          contentNotes={activeNoteContent}
          />
    </div>
  )
}

export default PreviewEditor