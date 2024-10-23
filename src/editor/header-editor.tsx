import { RootState } from "@/lib/redux/store"
import { setEditableEditor } from "@/lib/redux/slice/app"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import ButtonMenu from "@/components/primitive/button-menu"
import { ArrowMaximize24Regular, Edit24Regular, Eye24Regular, Save20Regular, Save24Regular, Settings24Regular, Star24Regular, TextCollapse24Regular } from "@fluentui/react-icons"
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

    const handlePreview = () => {
        try {
            dispatch(setEditableEditor(false));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header className="flex items-center gap-px">
            {editable ? (
                <ButtonMenu
                    label={LabelText.PREVIEW_NOTE}
                    action={handlePreview} variant={'ghost'} size={'icon'}>
                    <Save24Regular className="size-5" />
                </ButtonMenu>
            ) : (
                <ButtonMenu
                    label={LabelText.EDIT_NOTE}
                    action={() => {
                        dispatch(setEditableEditor(true));
                    }} variant={'ghost'} size={'icon'}>
                    <Edit24Regular className="size-5" />
                </ButtonMenu>
            )
            }
            <Separator orientation="vertical" />
            <ButtonMenu label={LabelText.SETTINGS} variant={'ghost'} size={'icon'}>
                <Star24Regular className="size-5" />
            </ButtonMenu>
            <ButtonMenu label={LabelText.SETTINGS} variant={'ghost'} size={'icon'}>
                <Settings24Regular className="size-5" />
            </ButtonMenu>
            <ButtonMenu label={LabelText.SETTINGS} variant={'ghost'} size={'icon'}>
                <ArrowMaximize24Regular className="size-5" />
            </ButtonMenu>
        </header>
    )
}
export default HeaderEditor