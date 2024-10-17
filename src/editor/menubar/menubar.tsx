import { useAppSelector } from "@/lib/hooks/use-redux";
import { RootState } from "@/lib/redux/store";
import { Editor } from "@tiptap/react"
import StaticToolbar from "./static-toolbar";
import BubbleToolbar from "./bubble-toolbar";

type Props = {
    editor: Editor | null
}
const MenuBar : React.FC<Props> = ({editor}) => {
    if(!editor) return null;
    const toggleEditor = useAppSelector((state: RootState) => state.app.menuToolbar)

    return(
        <>
            { toggleEditor ? (
                <StaticToolbar editor={editor} />
            ) : (
                <BubbleToolbar editor={editor} />
            )}
        </>
    )
}
export default MenuBar