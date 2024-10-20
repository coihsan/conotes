import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Sidebar from "@/components/sidebar/sidebar";
import NoteList from "@/containers/notelist";
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { MenuType } from '@/lib/enums';
import Favorites from "@/containers/favorites";
import TrashNotes from "@/containers/trash";
import Settings from "@/containers/settings";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const activeMenu = useSelector((state: RootState) => state.app.activeMenu);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Conotes App</title>
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
