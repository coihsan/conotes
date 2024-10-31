import { useParams } from "react-router-dom"
import '../styles/editor.module.scss'
import NoteEditor from "./note-editor"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { getActiveNote, updateContentThunk } from "@/lib/redux/slice/notes"
import { Content } from "@tiptap/react"
import { debounceEvent } from "@/lib/utils/helpers"

const PreviewEditor: React.FC = () => {
  const { noteId } = useParams()

  const dispatch = useAppDispatch();
  const activeNoteContent = useAppSelector((state) => state.notes.activeNoteId);
  const [noteContent, setNoteContent] = useState(activeNoteContent);

  const handleUpdateContent = debounceEvent((content: Content, title: string) => {
    if (noteId) {
      dispatch(updateContentThunk({
        noteId,
        content,
        title
      }));
    } else {
      console.error("noteId is undefined. Cannot update content.");
    }
  }, 500)

  useEffect(() => {
    setNoteContent(activeNoteContent);
  }, [activeNoteContent]);

  useEffect(() => {
    if (noteId) {
      dispatch(getActiveNote(noteId))
    } else {
      console.log('Not found')
    }
  }, [noteId, dispatch]);

  return (
    <div className="h-full w-full border rounded-r-2xl">
      <NoteEditor
        onChange={handleUpdateContent}
        contentNotes={noteContent}
      />
    </div>
  )
}

export default PreviewEditor