import { lazy } from 'react';


const AddProduct = lazy(()=> import('../../views/user/AddProduct'))
const AllProducts = lazy (()=> import('../../views/user/AllProducts'))
const Orders = lazy (()=> import('../../views/user/Orders'))
const ChatUsers = lazy (()=> import('../../views/user/ChatUsers'))
const Profile = lazy (()=> import('../../views/user/Profile'))


const sellerRoutes = [
    
    {path: '/user/add-product', element: <AddProduct />, role: 'seller', status:'active'},
    {path: '/user/products', element: <AllProducts />, role: 'seller', status:'active'},
    {path: '/user/orders', element: <Orders />, role: 'seller', status:'active'},
    {path: '/user/chat/:customerId', element: <ChatUsers />, role: 'seller', status:'active'},
    {path: '/user/profile', element: <Profile />, role: 'seller', status:'active'},
];

export default sellerRoutes;