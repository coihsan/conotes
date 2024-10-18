import './App.css'
import NotesListApp from './components/global/notelist-app'
import { Helmet, HelmetProvider } from 'react-helmet-async'

function App() {

  return (
    <HelmetProvider>
      <Helmet>
        <title>Conotes App</title>
        <meta name="description" content="A web-based notes app for everyone" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <main className='h-full w-full'>
        <NotesListApp />
      </main>
    </HelmetProvider>
  )
}

export default App