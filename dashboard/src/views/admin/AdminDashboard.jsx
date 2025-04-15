import React from 'react';
import { MdOutlineEuro } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";


const AdminDashboard = ()=> {
    return (
        <div className='px-2 md:px-7 py-5'>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                <div className='flex justify-between items-center p-5 bg-[#dfa1a1] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#343333]'>
                        <h2 className='text-3xl font-bold'>2340 €</h2>
                        <span className='text-md font-medium'>Total Ventas</span>
                    </div>
                    <div className='w-[40px] h-[40px] rounded-full  bg-[#f33232e2] flex justify-center items-center text-xl'>
                        <MdOutlineEuro className='text-[#fae8e8] shadow-lg' />
                    </div>
                </div>
                <div className='flex justify-between items-center p-5 bg-[#cea1df] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#343333]'>
                        <h2 className='text-3xl font-bold'>20</h2>
                        <span className='text-md font-medium'>Productos</span>
                    </div>
                    <div className='w-[40px] h-[40px] rounded-full bg-[#d53492e2] flex justify-center items-center text-xl'>
                        <MdOutlineProductionQuantityLimits className='text-[#fae8e8] shadow-lg' />
                    </div>
                </div>
                <div className='flex justify-between items-center p-5 bg-[#a1dfa5] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#343333]'>
                        <h2 className='text-3xl font-bold'>50</h2>
                        <span className='text-md font-medium'>Vendedores</span>
                    </div>
                    <div className='w-[40px] h-[40px] rounded-full bg-[#6bbc71] flex justify-center items-center text-xl'>
                        <FaRegUser className='text-[#fae8e8] shadow-lg' />
                    </div>
                </div>
                <div className='flex justify-between items-center p-5 bg-[#7aa3c1] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#343333]'>
                        <h2 className='text-3xl font-bold'>3000</h2>
                        <span className='text-md font-medium'>Pedidos </span>
                    </div>
                    <div className='w-[40px] h-[40px] rounded-full  bg-[#68b2e4] flex justify-center items-center text-xl'>
                        <MdBorderColor className='text-[#fae8e8] shadow-lg' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;