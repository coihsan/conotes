import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import SearchBar from '@/components/global/search-bar';
import { Separator } from '@/components/ui/separator';
import { LabelText } from '@/lib/label-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeaderSidebar from '@/components/global/header-sidebar';

const TrashNotes = () => {
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const dispatch = useDispatch()


    return (
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.TRASH} />
            <Separator orientation='horizontal' />
            <ScrollArea className='px-2'>
                {/* content */}
            </ScrollArea>
        </aside>
    )
}

export default TrashNotes;