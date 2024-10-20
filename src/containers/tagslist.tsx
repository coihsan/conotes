import { LabelText } from '@/lib/label-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeaderSidebar from '@/components/global/header-sidebar';

const Tagslist = () => {

    return (
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.TAGS} />
            <ScrollArea className='px-2'>
                {/* content */}
            </ScrollArea>
        </aside>
    )
}

export default Tagslist;