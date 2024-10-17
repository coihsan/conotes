import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { Provider } from 'react-redux';
import { store } from './lib/redux/store';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './components/global/landing-page.tsx';
import { ThemeProvider } from './providers/theme-provider'
import Layout from './components/global/layout.tsx';
import { Toaster } from "@/components/ui/toaster"
import { Toaster as ToasterSonner } from 'sonner'
import PreviewEditor from './editor/preview-editor.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/app" element={<Layout><App /></Layout>} />
              <Route path="/app/:noteId" element={<Layout><PreviewEditor /></Layout>} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <ToasterSonner position="top-center" />
      </Provider>
    </ThemeProvider>
  </StrictMode>
)