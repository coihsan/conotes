import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import ButtonMenu from '@/components/primitive/button-menu';
import { AddSquare24Regular } from '@fluentui/react-icons';
import { debounceEvent } from '@/lib/utils/helpers';
import SearchBar from '@/components/global/search-bar';
import { LabelText } from '@/lib/label-text';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const Boomark = () => {
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const dispatch = useDispatch()

    return (
        <aside className='sidebarOption'>
            <div className='static pb-4 px-4'>
                    <span className="text-xl font-bold">{LabelText.BOOMARK}</span>
                {/* <SearchBar searchRef={searchRef} searchQuery={_searchNotes} /> */}
            </div>
            <Separator orientation='horizontal' />
            <ScrollArea className='px-2'>
                {/* content */}
            </ScrollArea>
        </aside>
    )
}

export default Boomark;