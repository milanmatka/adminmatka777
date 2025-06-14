import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/Loadable';
import ProtectedRoute from '../components/ProtectedRoute';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Galidesawer = Loadable(lazy(() => import('../views/utilities/galidesawer')));
const Galidesaweresult = Loadable(lazy(() => import('../views/utilities/Galidesaweresult')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: '/ui/typography', element: <ProtectedRoute><TypographyPage /></ProtectedRoute> },
      { path: '/ui/shadow', element: <ProtectedRoute><Shadow /></ProtectedRoute> },
      { path: '/galidesawer', element: <ProtectedRoute><Galidesawer /></ProtectedRoute> },
      { path: '/galidesaweresult', element: <ProtectedRoute><Galidesaweresult /></ProtectedRoute> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;

export { FullLayout, BlankLayout, Dashboard, TypographyPage, Shadow, Galidesawer, Galidesaweresult, Error, Register, Login };
export { ProtectedRoute };
export { Loadable };