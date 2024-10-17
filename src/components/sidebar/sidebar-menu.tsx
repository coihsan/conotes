import { Notepad24Regular, NumberSymbol24Regular, Delete24Regular, Settings24Regular, Folder24Regular, Add24Regular, Star24Regular } from '@fluentui/react-icons';
import { ModeToggle } from '@/components/global/mode-toggle';
import React from "react";
import { Logo } from '@/components/global/logo';
import { useDispatch, useSelector } from 'react-redux';
import { MenuType } from '@/lib/enums';
import { setActiveMenu } from "@/lib/redux/slice/app";
import { RootState } from "@/lib/redux/store";
import clsx from "clsx";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import ButtonMenu from '@/components/primitive/button-menu';
import { LabelText } from '@/lib/label-text';
import AddCategoryForm from './add-category-form';


const SidebarMenu: React.FC = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false)

    const handleMenuClick = (menu: MenuType) => {
        dispatch(setActiveMenu(menu));
    };

    const isActive = (menu: MenuType) => {
        const activeMenu = useSelector((state: RootState) => state.app.activeMenu);
        return activeMenu === menu;
    };

    return (
        <aside className="w-72 py-4 border-[1px] rounded-2xl px-2 bg-zinc-800 dark:bg-zinc-950 text-white flex flex-col justify-between h-full mr-1">
            <div className="flex flex-col w-full gap-2">
                <div className='pb-4 flex items-center pl-4 gap-2 w-full border-b border-zinc-700 dark:border-border'>
                    <Logo className="size-7 invert" />
                    <span className='text-2xl font-semibold'>Notes</span>
                </div>
                <div className='grid gap-1 border-b border-zinc-700 dark:border-border py-4'>
                    <div className='text-muted-foreground text-xs pl-4 pb-5 uppercase'>menu</div>
                    <div className='grid'>
                        <button onClick={() => handleMenuClick(MenuType.NOTES)} className={clsx(isActive(MenuType.NOTES) ? 'bg-zinc-700 dark:bg-zinc-800' : '', 'sidebarMenu')}>
                            <Notepad24Regular />
                            Notes
                        </button>
                        <button onClick={() => handleMenuClick(MenuType.TAGS)} className={clsx(isActive(MenuType.TAGS) ? 'bg-zinc-700 dark:bg-zinc-800' : '', 'sidebarMenu')}>
                            <NumberSymbol24Regular />
                            Tags
                        </button>
                        <button onClick={() => handleMenuClick(MenuType.FAVORITE)} className={clsx(isActive(MenuType.FAVORITE) ? 'bg-zinc-700 dark:bg-zinc-800' : '', 'sidebarMenu')}>
                            <Star24Regular />
                            Favorite
                        </button>
                        <button onClick={() => handleMenuClick(MenuType.TRASH)} className={clsx(isActive(MenuType.TRASH) ? 'bg-zinc-700 dark:bg-zinc-800' : '', 'sidebarMenu')}>
                            <Delete24Regular />
                            Trash
                        </button>
                        <button onClick={() => handleMenuClick(MenuType.SETTINGS)} className={clsx(isActive(MenuType.SETTINGS) ? 'bg-zinc-700 dark:bg-zinc-800' : '', 'sidebarMenu')}>
                            <Settings24Regular />
                            Settings
                        </button>
                    </div>
                </div>
                <div className='w-full py-4 px-2'>
                    <Collapsible 
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    >
                        <div className='flex items-center justify-between w-full relative'>
                            <CollapsibleTrigger>
                                FOLDERS
                            </CollapsibleTrigger>
                            <ButtonMenu side='right' size={'icon'} variant={'ghost'} label={LabelText.CREATE_NEW_FOLDER}>
                                <Add24Regular className='size-5' />
                            </ButtonMenu>
                        </div>
                        <CollapsibleContent className='pt-4'>
                            {/* <AddCategoryForm /> */}
                            <div role='button' className='pl-3 flex items-center gap-3 py-2 rounded-xl bg-zinc-700 dark:bg-muted'>
                                <Folder24Regular className='size-5' />
                                Folder 1
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
            <div className="grid gap-2">
                <ModeToggle />
            </div>
        </aside>
    )
}
export default SidebarMenu