import { RootState } from "@/lib/redux/store"
import { setEditableEditor } from "@/lib/redux/slice/app"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import ButtonMenu from "@/components/primitive/button-menu"
import { Edit24Regular, Eye24Regular, Settings24Regular, Star24Regular } from "@fluentui/react-icons"
import { LabelText } from "@/lib/label-text"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"

const HeaderEditor: React.FC = () => {

    // DISPATCH & SELECTOR
    const dispatch = useAppDispatch()
    const editable = useAppSelector((state: RootState) => state.app.editable);

    useEffect(() => {
        if (editable) {
            dispatch(setEditableEditor(true));
        }
    }, [editable, dispatch]);

    const handleSave = () => {
        try {
            dispatch(setEditableEditor(false));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className="flex items-center gap-1">
            {editable ? (
                <ButtonMenu
                    label={LabelText.PREVIEW_NOTE}
                    action={handleSave} variant={'ghost'} size={'icon'}>
                    <Eye24Regular />
                </ButtonMenu>
            ) : (
                <ButtonMenu
                    label={LabelText.EDIT_NOTE}
                    action={() => {
                        dispatch(setEditableEditor(true));
                    }} variant={'ghost'} size={'icon'}>
                    <Edit24Regular />
                </ButtonMenu>
            )
            }
            <Separator orientation="vertical" />
            <ButtonMenu label={LabelText.SETTINGS} variant={'ghost'} size={'icon'}>
                <Star24Regular />
            </ButtonMenu>
            <ButtonMenu label={LabelText.SETTINGS} variant={'ghost'} size={'icon'}>
                <Settings24Regular />
            </ButtonMenu>
        </header>
    )
}
export default HeaderEditor