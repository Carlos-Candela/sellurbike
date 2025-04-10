import {lazy} from 'react';

const AdminDashboard = lazy (() => import('../../views/admin/AdminDashboard.jsx'))


const adminRoutes = [
    {path: '/admin/dashboard', element: <AdminDashboard />, role:'admin'},
  ];
export default adminRoutes;