import { LabelText } from '@/lib/label-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeaderSidebar from '@/components/global/header-sidebar';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';
import { deleteEmptyTrashThunk, selectAllNotes } from '@/lib/redux/slice/notes';
import NotesListItems from '@/components/notes/noteslist-item';
import { Delete24Regular } from '@fluentui/react-icons';
import { Button } from "@/components/ui/button"
import { useModal } from '@/providers/alert-provider';
import UseAlertDialog from '@/components/primitive/alert-dialog';

const TrashNotes = () => {
    const dispatch = useAppDispatch()
    const notes = useAppSelector(selectAllNotes)
    const trashNotes = notes.filter(note => note.trash)
    const { setOpen, setClose } = useModal()

    const handleBulkDeletePermanent = () => {
        dispatch(deleteEmptyTrashThunk())
        setClose()
    }

    return (
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.TRASH}
                countIndex={trashNotes.length}
                buttonAction={
                    <>
                        {trashNotes.length === 0 ?
                            (
                                null
                            ) : (
                                <Button variant={'destructive'} size={'icon'}
                                    onClick={() => {
                                        setOpen(
                                            <UseAlertDialog
                                                title="Are you absolutely sure?"
                                                description="This action cannot be undone. This will permanently remove all your notes from our app."
                                                onAction={() => handleBulkDeletePermanent()}
                                            />
                                        );
                                    }}>
                                    <Delete24Regular />
                                </Button>
                            )
                        }
                    </>
                }
            />
            <ScrollArea className='h-full pt-2 scroll-smooth touch-pan-y pb-24'>
                <div className='grid grid-cols-1 gap-2 px-2 snap-end'>
                    {trashNotes?.length === 0 ? (
                        <div className='w-full p-4 flex items-center justify-center italic text-muted-foreground text-sm'>Empty</div>
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