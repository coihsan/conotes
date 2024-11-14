import { Editor } from "@tiptap/react";
import { 
    TextItalic20Filled,
     LineHorizontal120Filled,
     TextNumberListLtr20Filled,
     TextBulletList20Filled,
     TextQuote20Filled,
     CodeBlock20Filled,
     Code20Filled,
     TextAlignJustify20Filled,
     TextAlignRight20Filled,
     TextAlignCenter20Filled,
     TextAlignLeft20Filled,
     TextT20Filled,
     TextHeader320Filled,
     TextHeader220Filled,
     TextHeader120Filled,
     TextStrikethrough20Filled,
     TextBold20Filled
    } from "@fluentui/react-icons"
import { LabelMenubar } from "./label-text";

interface TextEditorMenuBarProps {
    icon: any;
    onClick: () => void;
    className?: string;
    active?: boolean;
    label: LabelMenubar
    disabled?: boolean
}

export const TextEditorMenuBar = (editor: Editor): TextEditorMenuBarProps[] =>
    [
        {
            icon: TextBold20Filled,
            label: LabelMenubar.BOLD,
            onClick: () => editor.chain().focus().toggleBold().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('bold') ? 'bg-muted' : '',
        },
        {
            icon: TextItalic20Filled,
            label: LabelMenubar.ITALIC,
            onClick: () => editor.chain().focus().toggleItalic().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('italic') ? 'bg-muted' : '',
        },
        {
            icon: TextStrikethrough20Filled,
            label: LabelMenubar.STRIKE,
            onClick: () => editor.chain().focus().toggleStrike().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('strike') ? 'bg-muted' : '',
        },
        {
            icon: TextHeader120Filled,
            label: LabelMenubar.H1,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            className: editor.isActive('heading', { level: 1 }) ? 'bg-muted' : '',
        },
        {
            icon: TextHeader220Filled,
            label: LabelMenubar.H2,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            className: editor.isActive('heading', { level: 2 }) ? 'bg-muted' : 'bg-transparent',
        },
        {
            icon: TextHeader320Filled,
            label: LabelMenubar.H3,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            className: editor.isActive('heading', { level: 3 }) ? 'bg-muted' : '',
        },
        {
            icon: TextT20Filled,
            label: LabelMenubar.P,
            onClick: () => editor.chain().focus().setParagraph().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('paragraph') ? 'bg-muted' : '',
        },
        {
            icon: TextAlignLeft20Filled,
            label: LabelMenubar.TEXT_ALIGN_LEFT,
            onClick: () => editor.chain().focus().setTextAlign('left').run() && !editor.isActive('codeBlock'),
            className: editor.isActive({ textAlign: 'left' }) ? 'bg-muted' : '',
        },
        {
            icon: TextAlignCenter20Filled,
            label: LabelMenubar.TEXT_ALIGN_CENTER,
            onClick: () => editor.chain().focus().setTextAlign('center').run() && !editor.isActive('codeBlock'),
            className: editor.isActive({ textAlign: 'center' }) ? 'bg-muted' : '',
        },
        {
            icon: TextAlignRight20Filled,
            label: LabelMenubar.TEXT_ALIGN_RIGHT,
            onClick: () => editor.chain().focus().setTextAlign('right').run() && !editor.isActive('codeBlock'),
            className: editor.isActive({ textAlign: 'right' }) ? 'bg-muted' : '',
        },
        {
            icon: TextAlignJustify20Filled,
            label: LabelMenubar.TEXT_ALIGN_JUSTIFY,
            onClick: () => editor.chain().focus().setTextAlign('justify').run() && !editor.isActive('codeBlock'),
            className: editor.isActive({ textAlign: 'justify' }) ? 'bg-muted' : '',
        },
        {
            icon: Code20Filled,
            label: LabelMenubar.CODE,
            onClick: () => editor.chain().focus().toggleCode().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('code') ? 'bg-muted' : '',
            disabled: !editor.can().chain().focus().toggleCode().run()
        },
        {
            icon: CodeBlock20Filled,
            label: LabelMenubar.CODE_BLOCK,
            onClick: () => editor.chain().focus().toggleCodeBlock().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('codeBlock') ? 'bg-muted' : '',
        },
        {
            icon: TextQuote20Filled,
            label: LabelMenubar.QUOTE,
            onClick: () => editor.chain().focus().toggleBlockquote().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('blockquote') ? 'bg-muted' : '',
        },
        {
            icon: TextBulletList20Filled,
            label: LabelMenubar.UL,
            onClick: () => editor.chain().focus().toggleBulletList().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('bulletList') ? 'bg-muted' : '',
        },
        {
            icon: TextNumberListLtr20Filled,
            label: LabelMenubar.OL,
            onClick: () => editor.chain().focus().toggleOrderedList().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('orderedList') ? 'bg-muted' : '',
        },
        {
            icon: LineHorizontal120Filled,
            label: LabelMenubar.HR,
            onClick: () => editor.chain().focus().setHorizontalRule().run() && !editor.isActive('codeBlock'),
            className: editor.isActive('horizontalRule') ? 'bg-muted' : '',
        },

    ]


export const FEATURESAPP = [
    {
        title: "100% Open-source",
        description: "We are not making this app for any commercial use."
    },
    {
        title: "No tracking or analytics",
        description: "We do not collect any information from our users."
    },
    {
        title: "No database",
        description: `All notes will be saved to client-side storage in indexedDB. But don't provide any data sensitive.`
    },
    {
        title: "No login",
        description: "Only available for demo user w/o login or signup action required."
    },
]