import { RootState } from "@/lib/redux/store"
import { setEditableEditor } from "@/lib/redux/slice/app"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux"
import ButtonMenu from "@/components/primitive/button-menu"
import { Edit24Regular, Save24Regular, Settings24Regular, Star24Regular } from "@fluentui/react-icons"
import { LabelText } from "@/lib/label-text"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"
import { toast } from "sonner"

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
            toast('Saved sucessfully')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header>
            <div className="flex items-center">
                <div className="text-muted-foreground text-xs pr-4">Last update : </div>
                {editable ? (
                    <ButtonMenu
                        label={LabelText.SAVE_NOTES}
                        action={handleSave} variant={'ghost'} size={'icon'}>
                        <Save24Regular />
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
            </div>
        </header>
    )
}
export default HeaderEditor