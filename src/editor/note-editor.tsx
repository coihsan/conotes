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
import { setEditableEditor } from "@/lib/redux/slice/app"
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
    const dispatch = useAppDispatch()
    const { editable } = useAppSelector(getApp);

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
            const getFirst = getNotesTitle(editorContent[0])
            onChange(editorContent, getFirst)
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
        <>
            {editable && <StaticToolbar editor={editor} />}
            <ScrollArea className='px-12'>
                <EditorContent
                    className={cn(css.tiptap)}
                    editor={editor}
                />
                <ScrollBar orientation='vertical' />
            </ScrollArea>
        </>
    )
}

export default NoteEditor