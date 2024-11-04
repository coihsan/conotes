import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Sidebar from "@/components/sidebar/sidebar";
import NoteList from "@/containers/notelist";
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { MenuType } from '@/lib/enums';
import Favorites from "@/containers/favorites";
import TrashNotes from "@/containers/trash";
import Settings from "@/containers/settings";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux";
import Folders from "@/containers/folders";
import { getTitleHead } from "@/lib/utils/helpers";
import useLocalStorage from "@/lib/hooks/use-localstorage";
import { useEffect } from "react";
import { setActiveMenu } from "@/lib/redux/slice/app";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const activeMenu = useAppSelector((state) => state.app.activeMenu);
  const activeNoteId = useAppSelector((state) => state.notes.activeNoteId)
  const activeNotes = getTitleHead(activeNoteId)

  const [isActiveMenu, setIsActiveMenu] = useLocalStorage('activeMenu', MenuType.NOTES)

  useEffect(() => {
    setIsActiveMenu(activeMenu);
  }, [activeMenu, setIsActiveMenu]);

  useEffect(() => {
    dispatch(setActiveMenu(isActiveMenu));
  }, [isActiveMenu, dispatch]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{activeNotes}</title>
        <meta name="description" content="A web-based notes app for everyone" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <div className='w-screen h-screen flex p-1'>
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
        >
          <ResizablePanel className="min-w-[280px] max-w-[500px]" defaultSize={25}>
            {activeMenu === MenuType.NOTES && <NoteList />}
            {activeMenu === MenuType.FAVORITE && <Favorites />}
            {activeMenu === MenuType.TRASH && <TrashNotes />}
            {activeMenu === MenuType.SETTINGS && <Settings />}
            {activeMenu === MenuType.FOLDER && <Folders /> }
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center">
              {children}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </HelmetProvider>
  )
}

export default Layout
