import css from '../styles/editor.module.scss'
import { Content, EditorContent, HTMLContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import { cn } from "@/lib/utils/cn"
import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppSelector } from "@/lib/hooks/use-redux"
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { getNotesTitle } from '@/lib/utils/helpers'
import StaticToolbar from './toolbar/static-toolbar'
import { Folder24Regular, History24Regular, NumberSymbol24Regular } from '@fluentui/react-icons'
import { Badge } from '@/components/ui/badge'

interface Props {
    contentNotes: Content;
    onChange: (content: HTMLContent, title: string) => void;
}

const HeadingDcoument = Document.extend({
    content: 'heading block*',
  })

const NoteEditor: React.FC<Props> = ({ contentNotes, onChange }) => {
    const editable = useAppSelector((state) => state.app.editable);

    const editor = useEditor({
        extensions: [
            HeadingDcoument,
            StarterKit.configure({
                document: false,
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