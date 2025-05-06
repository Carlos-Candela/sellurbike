import {lazy} from 'react';

const Category = lazy (() => import('../../views/admin/Category.jsx'))
const Orders = lazy (() => import('../../views/admin/Orders.jsx'))
const AdminDashboard = lazy (() => import('../../views/admin/AdminDashboard.jsx'))
const Sellers = lazy (() => import('../../views/admin/Sellers.jsx'))
const PaymentRequest = lazy (() => import('../../views/admin/PaymentRequest.jsx'))
const DeactiveSellers = lazy (() => import('../../views/admin/DeactiveSellers.jsx'))
const SellerRequest = lazy (() => import('../../views/admin/SellerRequest.jsx'))
const SellerDetails = lazy (() => import('../../views/admin/SellerDetails.jsx'))
const ChatSeller = lazy (() => import('../../views/admin/ChatSeller.jsx'))
const OrderDetails = lazy (() => import('../../views/admin/OrderDetails.jsx'))

const adminRoutes = [
    
    {path: 'admin/dashboard', element: <AdminDashboard />, role:'admin'},
    {path: 'admin/dashboard/orders', element: <Orders />, role:'admin'},
    {path: 'admin/dashboard/category', element: <Category />, role:'admin'},
    {path: 'admin/dashboard/sellers', element: <Sellers />, role:'admin'},
    {path: 'admin/dashboard/payments', element: <PaymentRequest />, role:'admin'},
    {path: 'admin/dashboard/deactive-sellers', element: <DeactiveSellers />, role:'admin'},
    {path: 'admin/dashboard/sellers-request', element: <SellerRequest />, role:'admin'},
    {path: 'admin/dashboard/seller/details/:sellerId', element: <SellerDetails />, role:'admin'},
    {path: 'admin/dashboard/chat-sellers', element: <ChatSeller />, role:'admin'},
    {path: 'admin/dashboard/order/details/:orderId', element: <OrderDetails />, role:'admin'},
  ];
export default adminRoutes;