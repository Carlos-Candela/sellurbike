import {lazy} from 'react';


const Category = lazy (() => import('../../views/admin/Category.jsx'))
const Orders = lazy (() => import('../../views/admin/Orders.jsx'))
const AdminDashboard = lazy (() => import('../../views/admin/AdminDashboard.jsx'))


const adminRoutes = [
    {path: 'admin/dashboard', element: <AdminDashboard />, role:'admin'},
    {path: 'admin/dashboard/orders', element: <Orders />, role:'admin'},
    {path: 'admin/dashboard/category', element: <Category />, role:'admin'},
  ];
export default adminRoutes;