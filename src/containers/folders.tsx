import { LabelText } from "@/lib/label-text"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import HeaderSidebar from "@/components/global/header-sidebar"

const Folders = () => {
    return(
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.FOLDER} />
            <Separator orientation='horizontal' />
            <ScrollArea className='px-2'>
                {/* content */}
            </ScrollArea>
        </aside>
    )
}

export default Folders