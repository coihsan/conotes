import { Folder24Regular } from "@fluentui/react-icons"
import SidebarGroup from "./wrapper/sidebar-group"
import { Badge } from "../ui/badge"
import React from "react"

const FolderTags: React.FC = () => {

    return (
        <SidebarGroup sidebarName="Tags">
            <div role="button" className="flex items-center justify-between w-full hover:bg-zinc-900 p-2">
                <div className='flex items-center gap-3 text-sm'>
                    <Folder24Regular className='size-5' />
                    {/* <AddCategoryForm /> */}
                </div>
                <Badge variant={"icon"}>12</Badge>
            </div>
        </SidebarGroup>
    )
}
export default FolderTags