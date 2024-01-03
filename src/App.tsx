import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Home from "./features/home/Home";
import LoginForm from "./features/auth/login/LoginForm";
import Loader from "./ui/Loader";
import SignupForm from "./features/auth/sign-up/SignupForm";
import RegisterUser from "./features/auth/sign-up/RegisterUser";
import ProtectedRoute from "./ui/ProtectedRoute";
import NotFound from "./ui/NotFound";
import { Toaster } from "react-hot-toast";
import Analytics from "./features/analytics/Analytics";
import LinkDetails from "./features/link-details/LinkDetails";
import { Suspense, lazy } from "react";

import LinksLayout from "./features/links/LinksLayout"
const CreateLinkForm = lazy(
  () => import("./features/links/CreateLinkForm")
);
const QrCodesLayout = lazy(
  () => import("./features/qr-codes/QrCodesLayout")
);
const CreateQRForm = lazy(
  () => import("./features/qr-codes/CreateQRForm")
);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3 * 1000,
      },
    },
  });

  const router = createBrowserRouter([
    {
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        </Suspense>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/links",
          element: <LinksLayout/>
          // element: (
          //   <Suspense fallback={<Loader />}>
          //     <LinksLayout />
          //   </Suspense>
          // ),
        },
        {
          path: "/links/create",
          element: (
            <Suspense fallback={<Loader />}>
              <CreateLinkForm />
            </Suspense>
          ),
        },
        {
          path: "/qrcodes",
          element: (
            <Suspense fallback={<Loader />}>
              <QrCodesLayout />
            </Suspense>
          ),
        },
        {
          path: "/qrcodes/create",
          element: (
            <Suspense fallback={<Loader />}>
              <CreateQRForm />
            </Suspense>
          ),
        },
        // {
        //   path: "/create-user",
        //   element: <SignupForm />,
        // },
        {
          path: "/users",
          element: <RegisterUser />,
        },
        {
          path: "/users/new",
          element: <SignupForm />,
        },
        {
          path: "/analytics",
          element: (
            <Suspense fallback={<Loader />}>
              <Analytics />
            </Suspense>
          ),
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
          element: (
            <Suspense fallback={<Loader />}>
              <LinkDetails />
            </Suspense>
          ),
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
      path: "*",
      element: <NotFound />,
      loader: Loader,
    },
    {
      path: "/signup",
      element: <SignupForm />,
      loader: Loader,
      errorElement: <Error />,
    },

  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
