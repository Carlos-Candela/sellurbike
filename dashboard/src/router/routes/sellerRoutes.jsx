import { lazy } from 'react';

const Home = lazy(() => import('../../views/Home'));
const AddProduct = lazy(()=> import('../../views/user/AddProduct'))

const sellerRoutes = [
    {path: '/seller/add-product', element: <AddProduct />, ability: 'seller'},
];

export default sellerRoutes;