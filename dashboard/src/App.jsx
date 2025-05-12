import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from './router/Router';
import publicRoutes from './router/routes/publicRoutes';
import { getRoutes } from './router/routes';
import { fetchCategories } from './store/Reducers/categoryReducer';
import { get_user_info } from './store/Reducers/authReducer';

function App() {
  const dispatch = useDispatch();

  const {token}= useSelector((state)=> state.auth)
  const categories = useSelector((state) => state.categories.categories);

  useEffect(()=>{
    if(token){
      dispatch(get_user_info())
    }
  }, [token])

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories on app load
  }, [dispatch]);

  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  useEffect(() => {
    const privateRoutes = getRoutes();
    setAllRoutes([...publicRoutes, ...privateRoutes]);
  }, []);

  return <Router allRoutes={allRoutes} categories={categories} />;
}

export default App;