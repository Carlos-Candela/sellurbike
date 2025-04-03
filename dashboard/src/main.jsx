import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; 


const App = lazy(() => import('./App'));

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Suspense fallback={<div className='flex justify-center items-center min-h-screen bg-[#c9c4f4]'>Loading...</div>}>
      <App />
    </Suspense>
  </BrowserRouter>,
);
