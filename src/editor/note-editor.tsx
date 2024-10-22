import css from '../styles/editor.module.scss'
import { Content, EditorContent, HTMLContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { cn } from "@/lib/utils/cn"
import React from "react"
import { RootState } from "@/lib/redux/store"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useAppSelector } from "@/lib/hooks/use-redux"
import MenuBar from "./toolbar"
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { NoteItem } from '@/lib/types'

interface Props {
    contentNotes: NoteItem;
    onChange: (content: HTMLContent) => void;
}

const NoteEditor: React.FC<Props> = ({ contentNotes, onChange }) => {
    const editable = useAppSelector((state: RootState) => state.app.editable);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
            }),
            Placeholder.configure({
                placeholder: 'Write something …',
                showOnlyWhenEditable: false,
                emptyEditorClass: 'is-editor-empty',
                emptyNodeClass: 'dasdasd',
              })
            ,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        editable: editable,
        autofocus: true,
        content: contentNotes.content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    }, [contentNotes.id, editable, onChange])

    return (
        <>
            {editable && <MenuBar editor={editor} />}
            <ScrollArea>
                <EditorContent
                    className={cn(css.tiptap)}
                    editor={editor}
                />
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </>
    )
}

export default NoteEditor