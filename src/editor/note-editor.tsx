import css from '../styles/editor.module.scss'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { cn } from "@/lib/utils/cn"
import React from "react"
import { RootState } from "@/lib/redux/store"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useAppSelector } from "@/hooks/use-redux"
import MenuBar from "./menubar/menubar"

interface Props {
    contentNotes: string | null
}

const NoteEditor: React.FC<Props> = ({ contentNotes }) => {
    const editable = useAppSelector((state: RootState) => state.app.editable);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        editable: editable,
        autofocus: true,
        content: contentNotes,
    })

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