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
import { ClipboardLink24Regular, Delete24Regular, DeleteDismiss24Regular, Dismiss24Regular, Folder24Regular, MoreHorizontal16Regular, NumberRow20Filled, StarAdd24Regular, StarDismiss24Regular } from "@fluentui/react-icons";
import { deletePermanentAction, markAsFavoriteThunk, toggleTrashAction } from '@/lib/redux//slice/notes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';
import { MenuType } from '@/lib/enums';
import { copyToClipboard } from '@/lib/utils/helpers';
import { moveNoteToFolder } from '@/lib/redux/slice/folder';

type SettingMenuProps = {
  className?: string;
  noteId: string
}

const NotesListItemOptions: React.FC<SettingMenuProps> = ({ className, noteId }) => {
  const dispatch = useAppDispatch()

  const notes = useAppSelector((state) => state.notes.notes)
  const findFolder = useAppSelector((state) => state.folder.folder)
  const currentNote = notes.find((note) => note.id === noteId);
  const activeMenu = useAppSelector((state) => state.app.activeMenu);
  const isFavorite = currentNote?.favorite || false;

  const handleMarkAsFavorite = (noteId: string, value: boolean) => {
    dispatch(markAsFavoriteThunk({ noteId, value }))
    console.log('successfull mark as favorite')
  }

  const handleMoveToTrash = (noteId: string, value: boolean) => {
    try {
      dispatch(toggleTrashAction({noteId, value}));
      console.log('successfull move to trash')
    } catch (error) {
      console.log('error move to trash')
    }
  }

  const handleSingleDeletePermanent = (noteId: string) => {
    dispatch(deletePermanentAction(noteId))
    console.log('delete single is sucessfuly')
  }

  const handleCopyReferenceToNote = (noteId: string) => {
    copyToClipboard(noteId, noteId)
    console.log('bulk delete is succeessfully')
  }

  const handleMoveToFolder = () => {
    try {
      const notes = useAppSelector((state) => state.notes.notes)
      const noteId = notes.find((note) => note.id)?.folderId
      const findFolder = useAppSelector((state) => state.folder.folder)
      const folderId = findFolder.find((folder) => folder.id)?.id

      const data = {
        folderId: noteId as string,
        noteId: folderId as string
      }

      if(data) {
        dispatch(moveNoteToFolder(data))
        console.log('success move to folder')
      }
      return data
    } catch (error) {
      
    }
  }

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
                <DropdownMenuItem onClick={() => handleMoveToFolder} key={folder.id}>
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
              onClick={() => handleSingleDeletePermanent(noteId)}
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