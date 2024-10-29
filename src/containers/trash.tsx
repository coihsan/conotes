import { LabelText } from '@/lib/label-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeaderSidebar from '@/components/global/header-sidebar';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';
import { deleteEmptyTrashThunk } from '@/lib/redux/slice/notes';
import NotesListItems from '@/components/notes/noteslist-item';
import { Delete24Regular } from '@fluentui/react-icons';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

const TrashNotes = () => {
    const dispatch = useAppDispatch()
    const notes = useAppSelector((state) => state.notes.notes)
    const trashNotes = notes.filter(note => note.trash)

    const handleBulkDeletePermanent = () => {
        dispatch(deleteEmptyTrashThunk())
    }

    return (
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.TRASH}
                buttonAction={
                    <AlertDialog>
                        {trashNotes.length === 0 ? (
                            null
                        ) : (
                            <AlertDialogTrigger>
                                <Button className='flex items-center gap-2' variant={'destructive'} size={'default'}>
                                    <Delete24Regular />
                                    Empty trash
                                </Button>
                            </AlertDialogTrigger>
                        ) 
                        }
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently remove your data from our app.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleBulkDeletePermanent}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                }
            />
            <ScrollArea className='h-full pt-2 scroll-smooth touch-pan-y pb-24'>
                <div className='grid grid-cols-1 gap-2 px-2 snap-end'>
                    {trashNotes?.length === 0 ? (
                        <div className='w-full p-4 flex items-center justify-center italic text-muted-foreground text-sm'>Not found</div>
                    ) : (
                        <>
                            <NotesListItems index={trashNotes} />
                        </>
                    )}
                </div>
            </ScrollArea>
        </aside>
    )
}

export default TrashNotes;