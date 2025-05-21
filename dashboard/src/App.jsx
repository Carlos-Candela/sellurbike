import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from './router/Router';
import publicRoutes from './router/routes/publicRoutes';
import { getRoutes } from './router/routes';
import { get_user_info } from './store/Reducers/authReducer';

import { get_products } from './store/Reducers/productReducer';



function App() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParpage] = useState(1000);
    
 
  const {token}= useSelector((state)=> state.auth)
  

  useEffect(()=>{
    if(token){
      dispatch(get_user_info())
    }
  }, [token])



  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  useEffect(() => {
    const privateRoutes = getRoutes();
    setAllRoutes([...publicRoutes, ...privateRoutes]);
  }, []);

  return <Router allRoutes={allRoutes} categories={categories} />;
}

export default App;