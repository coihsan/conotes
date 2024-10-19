import css from '../styles/editor.module.scss'
import { EditorContent, HTMLContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { cn } from "@/lib/utils/cn"
import React from "react"
import { RootState } from "@/lib/redux/store"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useAppSelector } from "@/hooks/use-redux"
import MenuBar from "./menubar/menubar"
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'

interface Props {
    contentNotes: string | null;
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
        content: contentNotes,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    }, [contentNotes, editable, onChange])

    return (
        <div>
            {editable && <MenuBar editor={editor} />}
            <ScrollArea>
                <EditorContent
                    className={cn(css.editor)}
                    editor={editor}
                    placeholder="Write something ..."
                />
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </div>
    )
}

export default NoteEditor