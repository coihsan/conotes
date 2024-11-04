import { Notepad24Regular, Delete24Regular, Settings24Regular, Star24Regular, Notepad24Filled, Star24Filled, Delete24Filled, Settings24Filled } from '@fluentui/react-icons';
import React from "react";
import { Logo } from '@/components/global/logo';
import { MenuType } from '@/lib/enums';
import { setActiveMenu } from "@/lib/redux/slice/app";
import { Link } from 'react-router-dom';
import FolderNotes from './folder-notes';
import { ScrollArea } from '../ui/scroll-area';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleMenuClick = (menu: MenuType) => {
        dispatch(setActiveMenu(menu));
    };
    const isActive = (menu: MenuType) => {
        const activeMenu = useAppSelector((state) => state.app.activeMenu);
        return activeMenu === menu;
    };
    
    return (
        <aside className="w-80 py-4 border-[1px] rounded-2xl bg-zinc-800 dark:bg-zinc-950 text-white flex flex-col justify-between mr-1">
            <div className="flex flex-col w-full gap-2">
                <Link to={'/app'} className='flex items-center pl-4 gap-2 w-full'>
                    <Logo className="size-7 invert" />
                    <span className='text-2xl font-semibold'>conotes</span>
                </Link>
                <div className='border-b-[1px] border-zinc-700 dark:border-zinc-800 mb-5'>
                    <div className='grid gap-1 py-4 px-2'>
                        <div className='text-muted-foreground text-xs pl-4 pb-5 uppercase'>menu</div>
                        <div className='grid gap-1'>
                            <button onClick={() => handleMenuClick(MenuType.NOTES)} className='sidebarMenu'>
                                {isActive(MenuType.NOTES) ? (
                                    <Notepad24Filled />
                                ) : (
                                    <Notepad24Regular className='text-muted-foreground' />
                                )}
                                {MenuType.NOTES}
                            </button>
                            <button onClick={() => handleMenuClick(MenuType.FAVORITE)} className='sidebarMenu'>
                                {isActive(MenuType.FAVORITE) ? (
                                    <Star24Filled />
                                ) : (
                                    <Star24Regular className='text-muted-foreground' />
                                )}
                                {MenuType.FAVORITE}
                            </button>
                            <button onClick={() => handleMenuClick(MenuType.TRASH)} className='sidebarMenu'>
                                {isActive(MenuType.TRASH) ? (
                                    <Delete24Filled />
                                ) : (
                                    <Delete24Regular className='text-muted-foreground' />
                                )}
                                {MenuType.TRASH}
                            </button>
                            <button onClick={() => handleMenuClick(MenuType.SETTINGS)} className='sidebarMenu'>
                                {isActive(MenuType.SETTINGS) ? (
                                    <Settings24Filled />
                                ) : (
                                    <Settings24Regular className='text-muted-foreground' />
                                )}
                                {MenuType.SETTINGS}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollArea className='h-full'>
                <FolderNotes />
            </ScrollArea>
        </aside>
    )
}
export default Sidebar