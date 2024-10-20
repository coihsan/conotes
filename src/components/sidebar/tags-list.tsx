import { Folder24Regular } from "@fluentui/react-icons"
import SidebarGroup from "./wrapper/sidebar-group"

const TagsList = () => {
    return (
        <SidebarGroup sidebarName="Tags">
            <div role="button" className="flex items-center justify-between w-full hover:bg-zinc-900 p-2">
                <div className='flex items-center gap-3 text-sm'>
                    <Folder24Regular className='size-5' />
                    {/* <AddCategoryForm /> */}
                </div>
                <div className="text-xs rounded-full size-6 bg-zinc-700 p-1 lead-none whitespace-none">12</div>
            </div>
        </SidebarGroup>
    )
}
export default TagsList