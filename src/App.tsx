import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import Error from './ui/Error'
import Home from './ui/Home'
import LoginForm from './features/auth/login/LoginForm'
import Loader from './ui/Loader'
import SignupForm from './features/auth/sign-up/SignupForm'
import Confirm from './ui/Confirm'
import ProtectedRoute from './ui/ProtectedRoute'
import LinksLayout from './features/links/LinksLayout'
import QrCodesLayout from './features/qr-codes/QrCodesLayout'
import CreateLinkForm from './features/links/CreateLinkForm'
import CreateQRForm from "./features/qr-codes/CreateQRForm";
import { Toaster } from 'react-hot-toast'
import Analytics from './features/analytics/Analytics'
import LinkDetails from './features/link-details/LinkDetails'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      }
    }
  })

  const router = createBrowserRouter([
    {
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      errorElement: <Error />,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/links",
          element: <LinksLayout />,
        },
        {
          path: "/links/create",
          element: <CreateLinkForm />,
        },
        {
          path: "/qrcodes",
          element: <QrCodesLayout />,
        },
        {
          path: "/qrcodes/create",
          element: <CreateQRForm />,
        },
        {
          path: "/create-user",
          element: <SignupForm />,
        },
        {
          path: "/analytics",
          element: <Analytics />,
        },
        {
          path: "/campains",
          element: <Home />,
        },
        {
          path: "/settings",
          element: <Home />,
        },
        {
          path: "/link-details",
          element: <LinkDetails />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginForm />,
      loader: Loader,
      errorElement: <Error />,
    },
    {
      path: "/signup",
      element: <SignupForm />,
      loader: Loader,
      errorElement: <Error />,
    },
    {
      path: "/confirm",
      element: <Confirm />,
      loader: Loader,
      errorElement: <Error />,
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-right'/>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
