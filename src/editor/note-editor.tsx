import css from '../styles/editor.module.scss'
import { Content, EditorContent, HTMLContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import { cn } from "@/lib/utils/cn"
import React, { useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { getNotesTitle } from '@/lib/utils/helpers'
import StaticToolbar from './toolbar/static-toolbar'
import { Folder24Regular, History24Regular, NumberSymbol24Regular, StarAdd24Regular, StarDismiss24Filled } from '@fluentui/react-icons'
import { Badge } from '@/components/ui/badge'
import { setEditableEditor } from "@/lib/redux/slice/app"
import BreadcrumbNotes from "@/components/global/breadcrumb-notes"
import ButtonMenu from "@/components/primitive/button-menu"
import { LabelText } from "@/lib/label-text"
import { Edit24Regular, Save24Regular } from "@fluentui/react-icons"
import { Separator } from "@/components/ui/separator"
import SettingsMenuInNotes from "@/action/setting-menu-in-notes"
import { useParams } from 'react-router-dom'
import { markAsFavoriteThunk } from '@/lib/redux/slice/notes'

interface Props {
    contentNotes: Content;
    onChange: (content: HTMLContent, title: string) => void;
}

const HeadingDcoument = Document.extend({
    content: 'heading block*',
})

const createExtensions = [
    HeadingDcoument,
    StarterKit.configure({
        document: false,
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Placeholder.configure({
        placeholder: 'What’s the title?',
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-empty',
    })
]

const NoteEditor: React.FC<Props> = ({ contentNotes, onChange }) => {
    const { noteId } = useParams()
    const dispatch = useAppDispatch()
    const editable = useAppSelector((state) => state.app.editable);
    const notes = useAppSelector((state) => state.notes.notes)

    const isFavorites = notes.find((note) => note.id === noteId)?.favorite

    const editor = useEditor({
        extensions: createExtensions,
        content: contentNotes,
        editable: editable,
        autofocus: true,
        onUpdate: ({ editor }) => {
            const editorContent = editor.getHTML();
            const getFirst = editorContent[0]
            onChange(editorContent, getNotesTitle(getFirst))
        },
        editorProps: {
            attributes: {
              autocomplete: 'off',
              autocorrect: 'off',
              autocapitalize: 'off',
              class: cn('focus:outline-none', css.noteEditor)
            }
          },
    }, [])

    const handleToggleFavorite = (noteId: string, value: boolean) => {dispatch(markAsFavoriteThunk({noteId, value}))}
    const handlePreview = () => {dispatch(setEditableEditor(false))}
    const handleEditNote = () => {dispatch(setEditableEditor(true))}

    useEffect(() => {
        if (editor && contentNotes) {
          editor.commands.setContent(contentNotes);
        } else {
            editor?.commands.clearContent()
        }
      }, [contentNotes, editor]);

    useEffect(() => {
        if (editable) {
            dispatch(setEditableEditor(true))
        }
    }, [editable, dispatch]);

    return (
        <div className='h-full w-full'>
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
                    <SettingsMenuInNotes />
                </header>
            </div>
            {editable && <StaticToolbar editor={editor} />}
            <ScrollArea className='h-full w-full p-12'>
                <div className='flex items-center justify-between w-full'>
                    <div className="flex items-center gap-3">
                        <Badge variant={'outline'} className='gap-1'>
                            <NumberSymbol24Regular className='size-4' />
                            <span>firstnotes</span>
                        </Badge>
                        <Badge variant={'outline'} className='gap-1'>
                            <Folder24Regular className='size-4' />
                            <span>UI/UX</span>
                        </Badge>
                    </div>
                    <Badge variant={'ghost'} className='gap-1'>
                        <History24Regular className='size-4' />
                        03-31-2019
                    </Badge>
                </div>
                <EditorContent
                    className={cn(css.tiptap)}
                    editor={editor}
                />
            </ScrollArea>
        </div>
    )
}

export default NoteEditor