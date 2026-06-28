import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Landing, Login, Profile } from '@/pages';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Suspense, lazy } from 'react';

const Quiz = lazy(() => import('@/pages/Quiz'));
const Result = lazy(() => import('@/pages/Result'));

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    path: '/quiz',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>}>
          <Quiz />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/result',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>}>
          <Result />
        </Suspense>
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
