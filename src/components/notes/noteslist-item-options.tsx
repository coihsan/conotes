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
import { ClipboardLink24Regular, Delete24Regular, DeleteDismiss24Regular, Dismiss24Regular, Folder24Regular, MoreHorizontal16Regular, StarAdd24Regular, StarDismiss24Regular } from "@fluentui/react-icons";
import { deletePermanentAction, markAsFavoriteThunk, selectAllNotes, toggleTrashAction } from '@/lib/redux//slice/notes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';
import { MenuType } from '@/lib/enums';
import { copyToClipboard } from '@/lib/utils/helpers';
import { moveNoteToFolder } from '@/lib/redux/slice/folder';
import { getApp } from '@/lib/redux/selector';
import { toast } from "sonner"
import { selectAllFolder } from '../../lib/redux/slice/folder';
import { useModal } from '@/providers/alert-provider';
import UseAlertDialog from '../primitive/alert-dialog';

type SettingMenuProps = {
  className?: string;
  noteId: string
}

const NotesListItemOptions: React.FC<SettingMenuProps> = ({ className, noteId }) => {
  const dispatch = useAppDispatch()
  const { setOpen, setClose } = useModal()

  const notes = useAppSelector(selectAllNotes)
  const findFolder = useAppSelector(selectAllFolder)
  const currentNote = notes.find((note) => note.id === noteId);
  const { activeMenu } = useAppSelector(getApp);
  const isFavorite = currentNote?.favorite || false;

  const handleMarkAsFavorite = (noteId: string, value: boolean) => {
    dispatch(markAsFavoriteThunk({ noteId, value }))
    console.log('successfull mark as favorite')
  }

  const handleMoveToTrash = (noteId: string, value: boolean) => {
    try {
      dispatch(toggleTrashAction({ noteId, value }));
      console.log('successfull move to trash')
    } catch (error) {
      console.log('error move to trash')
    }
  }

  const handleSingleDeletePermanent = (noteId: string) => {
    dispatch(deletePermanentAction({ noteId }))
    setClose()
    console.log('delete single is sucessfuly')
  }

  const handleCopyReferenceToNote = (noteId: string) => {
    try {
      copyToClipboard(noteId, noteId)
      console.log('bulk delete is succeessfully')
      toast(`Copy note ID sucessfuly`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleMoveToFolder = (selectedNoteId: string, targetFolderId: string) => {
    try {
      dispatch(moveNoteToFolder({ noteId: selectedNoteId, folderId: targetFolderId }));
      console.log(`success move to ${targetFolderId}`);
    } catch (error) {
      console.error('Error moving note to folder:', error);
    }
  };

  return (
    <div onClick={(event) => event.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className={className}><MoreHorizontal16Regular /></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            {activeMenu === MenuType.TRASH || findFolder.length === 0 ? (
              null
            ) : (
              <DropdownMenuSubTrigger>
                <Folder24Regular className='size-5' />
                <span>Move to folder</span>
              </DropdownMenuSubTrigger>
            )}
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {findFolder.map((folder) => (
                  <DropdownMenuItem onClick={() => handleMoveToFolder(noteId, folder.id)} key={folder.id}>
                    <Folder24Regular />
                    <span>{folder.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {activeMenu === MenuType.TRASH ? (
            null
          ) : (
            isFavorite ? (
              <DropdownMenuItem onClick={() => handleMarkAsFavorite(noteId, false)}>
                <StarDismiss24Regular />
                Remove from favorite
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => handleMarkAsFavorite(noteId, true)}>
                <StarAdd24Regular />
                Mark as favorite
              </DropdownMenuItem>
            )
          )}
          {activeMenu === MenuType.TRASH &&
            <DropdownMenuItem
              onClick={() => handleMoveToTrash(noteId, false)}>
              <DeleteDismiss24Regular />
              Restore from trash
            </DropdownMenuItem>
          }
          <DropdownMenuItem onClick={() => handleCopyReferenceToNote(noteId)}>
            <ClipboardLink24Regular />
            Copy note ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {activeMenu === MenuType.TRASH ? (
            <>
              <DropdownMenuItem
                onClick={() => {
                  setOpen(
                    <UseAlertDialog
                      title="Are you absolutely sure?"
                      description="This action cannot be undone. This will permanently remove this notes from our app."
                      onAction={() => handleSingleDeletePermanent(noteId)}
                    />
                  );
                }}
                className='text-red-500'>
                <Dismiss24Regular />
                Delete permanent
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem
              onClick={() => handleMoveToTrash(noteId, true)}
              className='text-red-500'>
              <Delete24Regular />
              Move to trash
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export default NotesListItemOptions