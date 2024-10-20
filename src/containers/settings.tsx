import { LabelText } from '@/lib/label-text';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/hooks/use-redux';
import { setToggleEditor } from '@/lib/redux/slice/app';
import HeaderSidebar from '@/components/global/header-sidebar';

const Settings = () => {
    const dispatch = useAppDispatch()


    return (
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.SETTINGS} />
            <Separator orientation='horizontal' />
            <ScrollArea className='px-2'>
                <div className='p-4'>
                    <div className='flex justify-between items-center'>
                        Toolbar
                        <div className='flex items-center gap-2'>
                            <Button variant={'ghost'} onClick={() => dispatch(setToggleEditor(true))}>Default</Button>
                            <Button variant={'ghost'} onClick={() => dispatch(setToggleEditor(false))}>Bubble</Button>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </aside>
    )
}

export default Settings;