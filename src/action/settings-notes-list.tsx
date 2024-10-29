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
import { ClipboardLink24Regular, Delete24Regular, Folder24Regular, MoreHorizontal16Regular, StarAdd24Regular, StarDismiss24Regular } from "@fluentui/react-icons";
import { markAsFavoriteThunk, moveToTrashThunk } from '@/lib/redux//slice/notes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';
import { MenuType } from '@/lib/enums';

type SettingMenuProps = {
  className?: string;
  noteId: string
}

const SettingNotesList: React.FC<SettingMenuProps> = ({ className, noteId }) => {
  const dispatch = useAppDispatch()

  const notes = useAppSelector((state) => state.notes.notes)
  const currentNote = notes.find((note) => note.id === noteId);
  const activeMenu = useAppSelector((state) => state.app.activeMenu);
  const isFavorite = currentNote?.favorite || false;

  const handleMarkAsFavorite = (noteId: string, value: boolean) => {
    dispatch(markAsFavoriteThunk({ noteId, value }))
    console.log('successfull mark as favorite')
  }

  const handleMoveToTrash = (noteId: string) => {
    try {
      dispatch(moveToTrashThunk(noteId));
      handleMarkAsFavorite(noteId, false)
      console.log('successfull move to trash')
    } catch (error) {
      console.log('error move to trash')
    }
  };

  const handleCopyReferenceToNote = (noteId: string) => {
    navigator.clipboard.writeText(noteId)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}><MoreHorizontal16Regular /></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          {activeMenu !== MenuType.TRASH &&
            <DropdownMenuSubTrigger>
              <Folder24Regular className='size-5' />
              <span>Move to folder</span>
            </DropdownMenuSubTrigger>}
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Folder24Regular />
                <span>Email</span>
              </DropdownMenuItem>
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
          onClick={() => handleMoveToTrash(noteId)}>
          <Delete24Regular />
          Restore from trash
        </DropdownMenuItem>
        }
        <DropdownMenuItem onClick={() => handleCopyReferenceToNote(noteId)}>
          <ClipboardLink24Regular />
          Copy reference notes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {activeMenu === MenuType.TRASH ? (
          <>
          <DropdownMenuItem
              onClick={() => handleMoveToTrash(noteId)}
              className='text-red-500'>
              <Delete24Regular />
              Delete permanent
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem
            onClick={() => handleMoveToTrash(noteId)}
            className='text-red-500'>
            <Delete24Regular />
            Move to trash
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default SettingNotesList