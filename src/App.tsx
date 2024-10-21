import './App.css'
import NoteListTable from './components/global/notelist-table'
import { Helmet, HelmetProvider } from 'react-helmet-async'

function App() {

  return (
    <HelmetProvider>
      <Helmet>
        <title>Nulih</title>
        <meta name="description" content="A web-based notes app for everyone" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <main className='h-full w-full'>
        <NoteListTable />
      </main>
    </HelmetProvider>
  )
}

export default App