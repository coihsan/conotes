import { LabelText } from "@/lib/label-text"
import { ScrollArea } from "@/components/ui/scroll-area"
import HeaderSidebar from "@/components/global/header-sidebar"
import { useAppSelector } from "@/lib/hooks/use-redux"

const Folders = () => {
    const activeFolder = useAppSelector((state) => state.folder.activeFolderId)

    return(
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.FOLDER} />
            <ScrollArea className='px-2'>
                {/* content */}
            </ScrollArea>
        </aside>
    )
}

export default Folders