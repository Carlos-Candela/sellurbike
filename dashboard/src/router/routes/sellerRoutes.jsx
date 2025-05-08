import { lazy } from 'react';

const AddProduct = lazy(()=> import('../../views/user/AddProduct'))
const AllProducts = lazy (()=> import('../../views/user/AllProducts'))
const Orders = lazy (()=> import('../../views/user/Orders'))

const sellerRoutes = [
    
    {path: '/seller/add-product', element: <AddProduct />, role: 'seller', status:'active'},
    {path: '/seller/products', element: <AllProducts />, role: 'seller', status:'active'},
    {path: '/seller/orders', element: <Orders />, role: 'seller', status:'active'},
];

export default sellerRoutes;