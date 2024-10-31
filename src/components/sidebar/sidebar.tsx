import { Notepad24Regular, Delete24Regular, Settings24Regular, Star24Regular } from '@fluentui/react-icons';
import React from "react";
import { Logo } from '@/components/global/logo';
import { useDispatch, useSelector } from 'react-redux';
import { MenuType } from '@/lib/enums';
import { setActiveMenu } from "@/lib/redux/slice/app";
import { RootState } from "@/lib/redux/store";
import clsx from "clsx";
import { Link } from 'react-router-dom';
import FolderNotes from './folder-notes';
import FolderTags from './folder-tags';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();

    const handleMenuClick = (menu: MenuType) => {
        dispatch(setActiveMenu(menu));
    };

    const isActive = (menu: MenuType) => {
        const activeMenu = useSelector((state: RootState) => state.app.activeMenu);
        return activeMenu === menu;
    };

    return (
        <aside className="w-72 py-4 border-[1px] rounded-2xl bg-zinc-800 dark:bg-zinc-950 text-white flex flex-col justify-between mr-1">
            <div className="flex flex-col w-full gap-2">
                <Link to={'/app'} className='flex items-center pl-4 gap-2 w-full'>
                    <Logo className="size-7 invert" />
                    <span className='text-2xl font-semibold'>conotes</span>
                </Link>
                <div className='border-b-[1px] border-zinc-700 dark:border-zinc-800 mb-5'>
                    <div className='grid gap-1 py-4 px-2'>
                        <div className='text-muted-foreground text-xs pl-4 pb-5 uppercase'>menu</div>
                        <div className='grid gap-1'>
                            <button onClick={() => handleMenuClick(MenuType.NOTES)} className={clsx(isActive(MenuType.NOTES) ? 'bg-zinc-700 dark:bg-zinc-800' : '', 'sidebarMenu')}>
                                <Notepad24Regular className={clsx(isActive(MenuType.NOTES) ? 'text-white dark:text-foreground' : 'text-muted-foreground')} />
                                {MenuType.NOTES}
                            </button>
                            <button onClick={() => handleMenuClick(MenuType.FAVORITE)} className={clsx(isActive(MenuType.FAVORITE) ? 'bg-zinc-700 dark:bg-zinc-800' : '', 'sidebarMenu')}>
                                <Star24Regular className={clsx(isActive(MenuType.FAVORITE) ? 'text-white dark:text-foreground' : 'text-muted-foreground')} />
                                {MenuType.FAVORITE}
                            </button>
                            <button onClick={() => handleMenuClick(MenuType.TRASH)} className={clsx(isActive(MenuType.TRASH) ? 'bg-zinc-700 dark:bg-zinc-800' : '', 'sidebarMenu')}>
                                <Delete24Regular className={clsx(isActive(MenuType.TRASH) ? 'text-white dark:text-foreground' : 'text-muted-foreground')} />
                                {MenuType.TRASH}
                            </button>
                            <button onClick={() => handleMenuClick(MenuType.SETTINGS)} className={clsx(isActive(MenuType.SETTINGS) ? 'bg-zinc-700 dark:bg-zinc-800' : '', 'sidebarMenu')}>
                                <Settings24Regular className={clsx(isActive(MenuType.SETTINGS) ? 'text-white dark:text-foreground' : 'text-muted-foreground')} />
                                {MenuType.SETTINGS}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollArea className='h-full'>
                <FolderNotes />
                <FolderTags />
            </ScrollArea>
        </aside>
    )
}
export default Sidebar