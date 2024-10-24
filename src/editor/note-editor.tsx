import css from '../styles/editor.module.scss'
import { EditorContent, HTMLContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import { cn } from "@/lib/utils/cn"
import React from "react"
import { RootState } from "@/lib/redux/store"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppSelector } from "@/lib/hooks/use-redux"
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { getNotesTitle } from '@/lib/utils/helpers'
import StaticToolbar from './toolbar/static-toolbar'

interface Props {
    contentNotes: string | null;
    onChange: (content: HTMLContent, title: string) => void;
}

const HeadingDcoument = Document.extend({
    content: 'heading block*',
  })

const NoteEditor: React.FC<Props> = ({ contentNotes, onChange }) => {
    const editable = useAppSelector((state: RootState) => state.app.editable);

    const editor = useEditor({
        extensions: [
            HeadingDcoument,
            StarterKit.configure({
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
                <StaticToolbar editor={editor} />
            ) : (
                null
            )}
            <ScrollArea className='h-full p-12'>
                <div className='flex flex-col'>
                    <div className='text-xs text-muted-foreground'>Last updated : :</div>
                    <div className='text-xs text-muted-foreground'>Tags : </div>
                    <div className='text-xs text-muted-foreground'>Tags : </div>
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