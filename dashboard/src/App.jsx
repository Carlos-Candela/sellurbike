import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from './router/Router';
import publicRoutes from './router/routes/publicRoutes';
import { getRoutes } from './router/routes';
import { fetchCategories } from './store/Reducers/categoryReducer';

function App() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

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