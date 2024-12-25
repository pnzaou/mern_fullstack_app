import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import {QueryClient, QueryClientProvider} from 'react-query'
import './index.css'
import App from './App.jsx'
import SignIn from './pages/auth/Sign-in.jsx'
import SignUp from './pages/auth/Sign-up.jsx'
import ProtectedRoute from './components/Protected-route.jsx'
import Opening from './pages/Opening.jsx'
import ThemeProvider from './components/themeProvider.jsx'

const queryClient = new QueryClient()


const router = createBrowserRouter([
  ...["/", "/accueil", "/home"].map((path) => ({
    path,
    element: (
        <ProtectedRoute>
          <App/>
        </ProtectedRoute>
    ),
  })),
  {
    path: "/opening",
    element: <Opening/>
  },
  {
    path: "/connexion",
    element: (
        <SignIn/>
    ),
  },
  {
    path: "/inscription",
    element: <SignUp/> 
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router}/>
        <Toaster/>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
