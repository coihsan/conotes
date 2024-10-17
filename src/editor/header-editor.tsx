import { RootState } from "@/lib/redux/store"
import { setEditableEditor } from "@/lib/redux/slice/app"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux"
import ButtonMenu from "@/components/primitive/button-menu"
import { Edit24Regular, Save24Regular, Settings24Regular, Star24Regular } from "@fluentui/react-icons"
import { LabelText } from "@/lib/label-text"
import { Separator } from "@/components/ui/separator"
import { useParams } from "react-router-dom"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@/lib/db"
import { useEffect } from "react"
import { toast } from "sonner"
import { updateNoteContent } from "@/lib/redux/thunk"

const HeaderEditor: React.FC = () => {
    const { noteId } = useParams();

    // DISPATCH & SELECTOR
    const dispatch = useAppDispatch()
    const editable = useAppSelector((state: RootState) => state.app.editable);
    // QUERIES
    const notesItem = useLiveQuery(() => db.notes.toArray())
    const notesData = notesItem?.find((note) => note.id === noteId)

    const handleSave = () =>{
        try {
            dispatch(setEditableEditor(false));
            console.log('this save')
            toast('Saved sucessfully')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (editable) {
            dispatch(setEditableEditor(true));
        }
    }, [editable, dispatch]);

    return (
        <header>
            <div className="flex items-center">
                <div className="text-muted-foreground text-xs pr-4">Last update : {notesData?.lastUpdated}</div>
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