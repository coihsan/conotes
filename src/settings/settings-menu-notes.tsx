import React, { MouseEventHandler, useContext } from 'react' 

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Bookmark24Filled, Bookmark24Regular, Delete24Regular, Edit24Regular, Folder24Regular, MoreHorizontal16Regular, Star24Regular } from "@fluentui/react-icons";
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

type SettingMenuProps = {
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const SettingMenuNotes : React.FC<SettingMenuProps> = ({ className, onClick }) => {
    return(
        <AlertDialog>
            <DropdownMenu>
            <DropdownMenuTrigger className={className}><MoreHorizontal16Regular /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="flex items-center gap-3">
                    <Edit24Regular className="size-5" />
                    Rename
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3">
                    <Bookmark24Regular className="size-5" />
                    Add to boomark
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3">
                  <Folder24Regular className="size-5" />
                  Move to folder
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 flex items-center gap-2">
                    <Delete24Regular className="size-5" />
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
export default SettingMenuNotes


const ContexMenuOptions = () =>{
    return(
        <DropdownMenuItem className="flex items-center gap-3">
            <Edit24Regular className="size-5" />
            Rename
        </DropdownMenuItem>
    )
}