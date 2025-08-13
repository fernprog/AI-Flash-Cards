import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashBoard from '../pages/DashBoard';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import HomePage from '../pages/HomePage';

const router = createBrowserRouter([
{
  path: '/',
  element: <HomePage />,
  errorElement: <div>404 NOT FOUND</div>
},
{
  path: '/login',
  element: <Login />,
  errorElement: <div>404 NOT FOUND</div>
},
{
  path: '/sign-up',
  element: <SignUp />,
  errorElement: <div>404 NOT FOUND</div>
},
{
  path: '/dashboard',
  element: <DashBoard />,
  errorElement: <div>404 NOT FOUND</div>
}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
