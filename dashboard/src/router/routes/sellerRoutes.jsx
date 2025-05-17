import { lazy } from 'react';


const ProductDetail = lazy(()=>import('../../views/user/ProductDetail'))
const AddProduct = lazy(()=> import('../../views/user/AddProduct'))
const AllProducts = lazy (()=> import('../../views/user/AllProducts'))
const Orders = lazy (()=> import('../../views/user/Orders'))
const ChatUsers = lazy (()=> import('../../views/user/ChatUsers'))
const Profile = lazy (()=> import('../../views/user/Profile'))
const EditProduct = lazy (()=> import('../../views/user/EditProduct'))
const Pending = lazy (()=> import('../../views/Pending'))
const Deactive = lazy (()=> import('../../views/Deactive'))
const Support = lazy (()=> import('../../views/Support'))

const sellerRoutes = [
    
    {path: '/user/add-product', element: <AddProduct />, role: 'seller', status:'active'},
    {path: '/user/products', element: <AllProducts />, role: 'seller', status:'active'},
    {path: '/user/orders', element: <Orders />, role: 'seller', status:'active'},
    {path: '/user/chat/:customerId', element: <ChatUsers />, role: 'seller', status:'active'},
    {path: '/user/chat', element: <ChatUsers />, role: 'seller', status:'active'},
    {path: '/user/support', element: <Support />, role: 'seller', visibility: ['active', 'pending', 'deactive']},
    {path: '/user/profile', element: <Profile />, role: 'seller', status:'active'},
    {path: '/user/edit-product/:productId', element: <EditProduct />, role: 'seller', status:'active'},
    {path: '/user/product-detail/:productId', element: <ProductDetail />, role: 'seller', status:'active'},
    {path: '/user/account-pending', element: <Pending />, ability: 'seller', status:'active'},
    {path: '/user/account-deactive', element: <Deactive />, ability: 'seller', status:'active'},
];

export default sellerRoutes;