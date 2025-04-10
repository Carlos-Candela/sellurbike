import { lazy } from 'react';
const Home = lazy(() => import('../../views/Home'));

const sellerRoutes = [
    {path: '/', element: <Home />, ability: ['admin', 'seller']},
];

export default sellerRoutes;