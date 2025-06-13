import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import Userdetails from '../views/utilities/Userdetails';
import Homedp from '../views/utilities/Homedp';
import Gameresult from '../views/utilities/Gameresult';
import Approvepayouts from '../views/utilities/Approvepayouts';
import Bethistory from '../views/utilities/Bethistory';
import Galidesawerwinners from '../views/utilities/Galidesawerwinners';
import Starlineadd from '../views/utilities/Starlineadd';
import Starlineallbet from '../views/utilities/Starlineallbet';
import Starlineresult from '../views/utilities/Starlineresult';
/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))

const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Galidesawer = Loadable(lazy(() => import('../views/utilities/galidesawer')));
const Galidesaweresult = Loadable(lazy(() => import('../views/utilities/Galidesaweresult')));



const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth/login" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },

    
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '/Userdetails', exact: true, element: <Userdetails /> },
      { path: '/Home-image', exact: true, element: <Homedp /> },
      { path: '/Game-result', exact: true, element: <Gameresult /> },
      { path: '/Approve-payouts', exact: true, element: <Approvepayouts /> },
      { path: '/Bet-history', exact: true, element: <Bethistory /> },
      { path: '/galidesawer', exact: true, element: <Galidesawer /> },
      { path: '/galidesawerresult', exact: true, element: <Galidesaweresult /> },
      { path: '/galidesawerwinners', exact: true, element: <Galidesawerwinners /> },
      { path: '/starlineadd', exact: true, element: <Starlineadd /> },
      { path: '/starlineallbet', exact: true, element: <Starlineallbet /> },
      { path: '/starlineresult', exact: true, element: <Starlineresult /> },



      { path: '*', element: <Navigate to="/auth/404" /> },
      
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
