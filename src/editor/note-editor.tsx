import css from '../styles/editor.module.scss'
import { Content, EditorContent, HTMLContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { cn } from "@/lib/utils/cn"
import React, { useEffect } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import StaticToolbar from './toolbar/static-toolbar'
import { Folder24Regular, History24Regular, NumberSymbol24Regular } from '@fluentui/react-icons'
import { Badge } from '@/components/ui/badge'
import { setEditableEditor } from "@/lib/redux/slice/app"
import { useParams } from 'react-router-dom'
import { selectAllNotes } from '@/lib/redux/slice/notes'
import Document from '@tiptap/extension-document'
import { getApp } from '@/lib/redux/selector'
import { getNotesTitle } from '@/lib/utils/helpers'

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
    const { editable } = useAppSelector(getApp);
    const notes = useAppSelector(selectAllNotes)

    const editor = useEditor({
        extensions: createExtensions,
        content: contentNotes,
        editable: editable,
        autofocus: true,
        onCreate: ({ editor }) => {
            editor.isEmpty
        },
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
            {editable && <StaticToolbar editor={editor} />}
            <ScrollArea className='h-full w-full px-12 py-6'>
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
                <div className='h-full'>
                    <EditorContent
                        className={cn(css.tiptap)}
                        editor={editor}
                    />
                </div>
                <ScrollBar orientation='vertical' />
            </ScrollArea>
        </div>
    )
}

export default NoteEditor