import { useParams } from "react-router-dom"
import '../styles/editor.module.scss'
import NoteEditor from "./note-editor"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { getActiveNote, markAsFavoriteThunk, selectAllNotes, updateContentThunk } from "@/lib/redux/slice/notes"
import { Content } from "@tiptap/react"
import { debounceEvent } from "@/lib/utils/helpers"
import { getApp, getNotes } from "@/lib/redux/selector"
import BreadcrumbNotes from "@/components/global/breadcrumb-notes"
import ButtonMenu from "@/components/primitive/button-menu"
import { LabelText } from "@/lib/label-text"
import { Edit24Regular, Save24Regular, StarAdd24Regular, StarDismiss24Filled } from "@fluentui/react-icons"
import { Separator } from "@/components/ui/separator"
import NotesListNoteOptions from "@/components/notes/noteslist-note-options"
import { setEditableEditor } from "@/lib/redux/slice/app"

const PreviewEditor: React.FC = () => {
  const { noteId } = useParams()

  const dispatch = useAppDispatch();
  const { editable } = useAppSelector(getApp);
  const { activeNoteId } = useAppSelector(getNotes);
  const notes = useAppSelector(selectAllNotes)
  const [noteContent, setNoteContent] = useState(activeNoteId);
  const isFavorites = notes.find((note) => note.id === noteId)?.favorite

  const handleToggleFavorite = (noteId: string, value: boolean) => { dispatch(markAsFavoriteThunk({ noteId, value })) }
  const handlePreview = () => { dispatch(setEditableEditor(false)) }
  const handleEditNote = () => { dispatch(setEditableEditor(true)) }

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
    setNoteContent(activeNoteId);
  }, [activeNoteId]);

  useEffect(() => {
    if (noteId) {
      dispatch(getActiveNote(noteId))
    } else {
      console.log('Not found')
    }
  }, [noteId, dispatch]);

  return (
    <div className="h-full w-full border rounded-r-2xl">
      <div className="flex items-center justify-between w-full py-1 px-3 border-b-[1px]">
        <BreadcrumbNotes />
        <header className="flex items-center gap-px">
          <div className='text-xs text-muted-foreground pr-6'>Edit Oct 08</div>
          {editable ? (
            <ButtonMenu
              label={LabelText.PREVIEW_NOTE}
              action={handlePreview} variant={'ghost'} size={'icon'}>
              <Save24Regular className="size-5" />
            </ButtonMenu>
          ) : (
            <ButtonMenu
              label={LabelText.EDIT_NOTE}
              action={handleEditNote}
              variant={'ghost'} size={'icon'}>
              <Edit24Regular className="size-5" />
            </ButtonMenu>
          )}
          <Separator orientation="vertical" />
          {isFavorites ? (
            <ButtonMenu action={() => handleToggleFavorite(noteId as string, false)} label={LabelText.FAVORITE} variant={'ghost'} size={'icon'}>
              <StarDismiss24Filled className="size-5 text-creek-600 dark:text-creek-400" />
            </ButtonMenu>
          ) : (
            <ButtonMenu action={() => handleToggleFavorite(noteId as string, true)} label={LabelText.FAVORITE} variant={'ghost'} size={'icon'}>
              <StarAdd24Regular className="size-5" />
            </ButtonMenu>
          )}
          <NotesListNoteOptions />
        </header>
      </div>
      <NoteEditor
        onChange={handleUpdateContent}
        contentNotes={noteContent}
      />
    </div>
  )
}

export default PreviewEditor