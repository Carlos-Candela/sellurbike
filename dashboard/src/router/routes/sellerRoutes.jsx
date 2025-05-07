import { lazy } from 'react';

const AddProduct = lazy(()=> import('../../views/user/AddProduct'))
const AllProducts = lazy (()=> import('../../views/user/AllProducts'))

const sellerRoutes = [
    {path: '/seller/add-product', element: <AddProduct />, ability: 'seller'},
    {path: '/seller/all-products', element: <AllProducts />, ability: 'seller'},
];

export default sellerRoutes;