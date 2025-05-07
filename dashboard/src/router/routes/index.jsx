import adminRoutes from './adminRoutes';
import sellerRoutes from './sellerRoutes';
import { MainLayout } from '../../layout/MainLayout';

export const getRoutes = () => {
  return [
    {
      path: '/',
      element: <MainLayout />,
      children: adminRoutes, // Rutas que usan MainLayout
    },
    ...sellerRoutes, // Rutas que NO usan MainLayout
  ];
};