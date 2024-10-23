import css from '../styles/editor.module.scss'
import { EditorContent, HTMLContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { cn } from "@/lib/utils/cn"
import React from "react"
import { RootState } from "@/lib/redux/store"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppSelector } from "@/lib/hooks/use-redux"
import MenuBar from "./toolbar"
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { getNotesTitle } from '@/lib/utils/helpers'

interface Props {
    contentNotes: string | null;
    onChange: (content: HTMLContent, title: string) => void;
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
            const editorContent = editor.getHTML();
            const firstNode = editorContent[0];
            onChange(editorContent, getNotesTitle(firstNode))
        },
    }, [contentNotes, editable, onChange])

    return (
        <>
            {editable ? (
                <MenuBar editor={editor} />
            ) : (
                null
            )}
            <ScrollArea className='h-full p-12'>
                <EditorContent
                    className={cn(css.tiptap)}
                    editor={editor}
                >
                {/* TODO : Add  EditorProvider and this below component will be slotBefore component */}
                <div className='flex flex-col'>
                    <div className='text-xs text-muted-foreground'>Last updated : :</div>
                    <div className='text-xs text-muted-foreground'>Tags : </div>
                    <div className='text-xs text-muted-foreground'>Tags : </div>
                </div>
                </EditorContent>
            </ScrollArea>
        </>
    )
}

export default NoteEditor