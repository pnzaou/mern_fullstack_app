import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import {QueryClient, QueryClientProvider} from 'react-query'
import './index.css'
import App from './App.jsx'
import SignIn from './pages/auth/Sign-in.jsx'
import SignUp from './pages/auth/Sign-up.jsx'
import { TokenContextProvider } from './contexts/token.context.jsx'
import ProtectedRoute from './components/Protected-route.jsx'
import Opening from './pages/Opening.jsx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  ...["/", "/accueil", "/home"].map((path) => ({
    path,
    element: (
      <TokenContextProvider>
        <ProtectedRoute>
          <App/>
        </ProtectedRoute>
      </TokenContextProvider>
    ),
  })),
  {
    path: "/opening",
    element: <Opening/>
  },
  {
    path: "/connexion",
    element: (
      <TokenContextProvider>
        <SignIn/>
      </TokenContextProvider>
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
      <RouterProvider router={router}/>
      <Toaster/>
    </QueryClientProvider>
  </StrictMode>,
)
