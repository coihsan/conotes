import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { LabelText } from '@/lib/label-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeaderSidebar from '@/components/global/header-sidebar';

const TrashNotes = () => {
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const dispatch = useDispatch()


    return (
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.TRASH} />
            <ScrollArea className='px-2'>
                {/* content */}
            </ScrollArea>
        </aside>
    )
}

export default TrashNotes;