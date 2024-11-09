import { Editor } from "@tiptap/react"
import React from "react"
import ToggleMenu from "@/components/primitive/toggle-menu"
import { TextEditorMenuBar } from "@/lib/constants"

type Props = {
    editor: Editor | null,
}

const StaticToolbar: React.FC<Props> = ({ editor }) => {
    if (!editor) return null

    const menuItems = TextEditorMenuBar(editor);

    React.useEffect(() => {
        editor
    }, [editor])

    return (
        <div className="">
            <div className="flex flex-nowrap items-center gap-1 px-2 bg-white dark:bg-zinc-500/10 border-b-[1px] shadow-sm py-1">
                {menuItems.map((item, index) => (
                    <ToggleMenu size={'sm'} label={item.label} onClick={item.onClick} key={index} disabled={item.disabled}
                        className={item.className}
                    >
                        <div className="flex items-center justify-center">
                            <item.icon />
                        </div>
                    </ToggleMenu>
                ))}
            </div>
        </div>
    )
}
export default StaticToolbar