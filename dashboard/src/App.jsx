import React, { useEffect, useState } from 'react';
import Router from './router/Router'
import publicRoutes from './router/routes/publicRoutes';
import { getRoutes } from './router/routes';


function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  //console.log(allRoutes);
  useEffect(() => {
    const privateRoutes = getRoutes(); // ✅ un array
    setAllRoutes([...publicRoutes, ...privateRoutes]);
  }, []);
  //console.log(allRoutes);
  return <Router allRoutes={allRoutes} />;
}
export default App;