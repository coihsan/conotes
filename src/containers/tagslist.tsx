import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { debounceEvent } from '@/lib/utils/helpers';
import SearchBar from '@/components/global/search-bar';
import { Separator } from '@/components/ui/separator';
import { LabelText } from '@/lib/label-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeaderSidebar from '@/components/global/header-sidebar';

const Tagslist = () => {
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const dispatch = useDispatch()

    return (
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.TAGS} />
            <Separator orientation='horizontal' />
            <ScrollArea className='px-2'>
                {/* content */}
            </ScrollArea>
        </aside>
    )
}

export default Tagslist;