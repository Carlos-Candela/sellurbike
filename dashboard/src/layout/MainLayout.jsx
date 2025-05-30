import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export const MainLayout = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    return (
        <div className='bg-[#c9c4f4] w-full min-h-screen'>
            <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <div className='ml-0 lg:ml-[260px] transition-all'>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;