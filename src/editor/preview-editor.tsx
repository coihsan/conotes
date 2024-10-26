import { useParams } from "react-router-dom"
import '../styles/editor.module.scss'
import NoteEditor from "./note-editor"
import React, { useEffect, useState } from "react"
import { Loading } from "@/components/global/loading"
import BreadcrumbNotes from "@/components/global/breadcrumb-notes"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { getNotesContentByIDThunk, updateContentThunk } from "@/lib/redux/slice/notes"
import { setEditableEditor } from "@/lib/redux/slice/app"
import { HTMLContent } from "@tiptap/react"
import ButtonMenu from "@/components/primitive/button-menu"
import { LabelText } from "@/lib/label-text"
import { ArrowMaximize24Regular, Edit24Regular, Save24Regular, Star24Regular } from "@fluentui/react-icons"
import { Separator } from "@/components/ui/separator"
import SettingsMenuInNotes from "@/action/setting-menu-in-notes"

const PreviewEditor: React.FC = () => {
  const { noteId } = useParams()
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const editable = useAppSelector((state) => state.app.editable);
  const activeNoteContent = useAppSelector((state) => state.notes.activeNoteId);
  const [noteContent, setNoteContent] = useState(activeNoteContent);

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
    setNoteContent(activeNoteContent); 
  }, [activeNoteContent]);

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
        <header className="flex items-center gap-px">
          {editable ? (
            <ButtonMenu
              label={LabelText.PREVIEW_NOTE}
              action={() => dispatch(setEditableEditor(false))} variant={'ghost'} size={'icon'}>
              <Save24Regular className="size-5" />
            </ButtonMenu>
          ) : (
            <ButtonMenu
              label={LabelText.EDIT_NOTE}
              action={() => {
                dispatch(setEditableEditor(true));
              }} variant={'ghost'} size={'icon'}>
              <Edit24Regular className="size-5" />
            </ButtonMenu>
          )
          }
          <Separator orientation="vertical" />
          <ButtonMenu label={LabelText.SETTINGS} variant={'ghost'} size={'icon'}>
            <Star24Regular className="size-5" />
          </ButtonMenu>
          <SettingsMenuInNotes />
          <ButtonMenu label={LabelText.SETTINGS} variant={'ghost'} size={'icon'}>
            <ArrowMaximize24Regular className="size-5" />
          </ButtonMenu>
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