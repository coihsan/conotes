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
import { Folder24Regular, History24Regular, NumberSymbol24Regular, StarAdd24Regular, StarDismiss24Regular } from '@fluentui/react-icons'
import { Badge } from '@/components/ui/badge'
import { setEditableEditor } from "@/lib/redux/slice/app"
import BreadcrumbNotes from "@/components/global/breadcrumb-notes"
import ButtonMenu from "@/components/primitive/button-menu"
import { LabelText } from "@/lib/label-text"
import { Edit24Regular, Save24Regular } from "@fluentui/react-icons"
import { Separator } from "@/components/ui/separator"
import SettingsMenuInNotes from "@/action/setting-menu-in-notes"
import { useParams } from 'react-router-dom'

interface Props {
    contentNotes: Content;
    onChange: (content: HTMLContent, title: string) => void;
}
const HeadingDcoument = Document.extend({
    content: 'heading block*',
})

const NoteEditor: React.FC<Props> = ({ contentNotes, onChange }) => {
    const { noteId } = useParams()
    const dispatch = useAppDispatch()
    const editable = useAppSelector((state) => state.app.editable);
    const notes = useAppSelector((state) => state.notes.notes)

    const isFavorites = notes.find((note) => note.id === noteId)?.favorite

    const editor = useEditor({
        extensions: [
            HeadingDcoument,
            StarterKit.configure({
                document: false
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                        return 'What’s the title?'
                    }
                    return 'Can you add some further context?'
                },
            }),
        ],
        content: contentNotes,
        editable: editable,
        autofocus: true,
        onUpdate: ({ editor }) => {
            const editorContent = editor.getHTML();
            const firstNode = editorContent[0];
            onChange(editorContent, getNotesTitle(firstNode))
        },
    }, [])

    const handleToggleFavorite = (noteId: string, value: boolean) => {}

    const handlePreview = () => {
        dispatch(setEditableEditor(false))
    }

    const handleEditNote = () => {
        dispatch(setEditableEditor(true))
    }

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
        <>
            <div className="flex items-center justify-between w-full py-1 px-3 border-b-[1px]">
                <BreadcrumbNotes />
                <header className="flex items-center gap-px">
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
                        <ButtonMenu label={LabelText.FAVORITE} variant={'ghost'} size={'icon'}>
                        <StarDismiss24Regular className="size-5 text-yellow-600 dark:text-yellow-400" />
                    </ButtonMenu>
                    ) : (
                        <ButtonMenu label={LabelText.FAVORITE} variant={'ghost'} size={'icon'}>
                        <StarAdd24Regular className="size-5" />
                    </ButtonMenu>
                    )}
                    <SettingsMenuInNotes />
                </header>
            </div>
            {editable && <StaticToolbar editor={editor} />}
            <ScrollArea className='h-full p-12'>
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
        </>
    )
}

export default NoteEditor