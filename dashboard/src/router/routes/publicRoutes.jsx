import { lazy } from 'react';
import React from 'react';

const Home = lazy( ()=> import('../../views/Home'));
const Login = lazy(() => import('../../views/auth/Login'));
const Register = lazy(() => import('../../views/auth/Register'));
const AdminLogin = lazy(() => import('../../views/auth/AdminLogin'));

const publicRoutes = [
  {path: '/login', element: <Login />},
  {path: '/register', element: <Register />},
  {path: '/admin/login', element: <AdminLogin />},
  {path: '/', element: <Home />},
];

export default publicRoutes;