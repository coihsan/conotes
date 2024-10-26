import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ClipboardLink24Regular, Delete24Regular, Folder24Regular, MoreHorizontal16Regular, Star24Regular, StarDismiss24Regular } from "@fluentui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { markAsFavoriteThunk, moveToTrashThunk, removeMarkAsFavoriteThunk } from '@/lib/redux//slice/notes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';

type SettingMenuProps = {
  className?: string;
  noteId: string
}

const SettingNotesList: React.FC<SettingMenuProps> = ({ className, noteId }) => {
  const dispatch = useAppDispatch()

  const notes = useAppSelector((state) => state.notes.notes)
  const currentNote = notes.find((note) => note.id === noteId);
  const isFavorite = currentNote?.favorite || false;

  const handleMoveToTrash = (noteId: string) => {
    try {
      dispatch(moveToTrashThunk(noteId));
      dispatch(removeMarkAsFavoriteThunk(noteId))
      console.log('successfull move to trash')
    } catch (error) {
      console.log('error move to trash')
    }
  };

  const handleMarkAsFavorite = (noteId: string) => {
    dispatch(markAsFavoriteThunk(noteId))
    console.log('successfull mark as favorite')
  }
  const handleRemoveMarkAsFavorite = (noteId: string) => {
    dispatch(removeMarkAsFavoriteThunk(noteId))
    console.log('successfull mark as favorite')
  }

  const handleCopyReferenceToNote = (noteId: string) => {
    navigator.clipboard.writeText(noteId)
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className={className}><MoreHorizontal16Regular /></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Folder24Regular className='size-5' />
              <span>Move to folder</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Folder24Regular />
                  <span>Email</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {isFavorite ? (
            <DropdownMenuItem onClick={() => handleRemoveMarkAsFavorite(noteId)}>
              <StarDismiss24Regular />
              Remove as favorite
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => handleMarkAsFavorite(noteId)}>
              <Star24Regular />
              Mark as favorite
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => handleCopyReferenceToNote(noteId)}>
            <ClipboardLink24Regular />
            Copy reference notes
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleMoveToTrash(noteId)}
            className='text-red-500'>
            <Delete24Regular />
            Move to trash
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default SettingNotesList