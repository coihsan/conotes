import './App.css'
import EmptyEditor from './editor/empty-editor'
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
        <EmptyEditor />
      </main>
    </HelmetProvider>
  )
}

export default App