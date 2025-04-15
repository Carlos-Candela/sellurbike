import React from 'react';
import { MdOutlineEuro } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";
import Chart from "react-apexcharts";

const AdminDashboard = ()=> {
    
    const state = {
        series: [
            {
                name: "Pedidos",
                data: [450, 400, 300, 500, 200, 100, 666,800,100,150,600,700],
            },
            {
                name: "Ganancias",
                data: [200, 300, 400, 500, 600, 700, 400, 300, 500, 200, 100, 666],
            },
            {
                name: "Vendedores",
                data: [100, 200, 300, 400, 500, 600, 300, 400, 500, 600, 700, 400],
            },
        ],
        options: {
            colors: ['#68b2e4', '#f33232e2', '#a1dfa5'],
            plotOptions: {
                radius: 30,
            },
            chart: {
                background: 'transparent',
                foreColor: '#d0d2d6',
            },
            stroke: {
                show: true,
                curve: ['smooth', 'straight', 'stepline'],
                lineCap: 'butt',
                colors: ['#181ee8', '#f57c00', '#0288d1'],
                width: 0.5,
                dashArray: 0,
            },
            xaxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            },
            legend: {
                position: 'top',
            },
            responsive: [
                {
                    breakpoint: 565,
                    options: {
                        plotOptions: {
                            bar: {
                                horizontal: true,
                            },
                        },
                        chart: {
                            height: 550,
                        },
                    },
                },
            ],
        },
    };
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
                <div className='flex justify-between items-center p-5 bg-[#7bc3f6] rounded-md gap-3'>
                    <div className='flex flex-col justify-start items-start text-[#343333]'>
                        <h2 className='text-3xl font-bold'>3000</h2>
                        <span className='text-md font-medium'>Pedidos </span>
                    </div>
                    <div className='w-[40px] h-[40px] rounded-full  bg-[#68b2e4] flex justify-center items-center text-xl'>
                        <MdBorderColor className='text-[#fae8e8] shadow-lg' />
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-wrap mt-7'>
                <div className='w-full lg:w-7/12 lg:pr-3'>
                    <div className='w-full bg-[#6a5fdf] p-4 rounded-md'>
                        <Chart options={state.options} series={state.series} type='bar' height={350} />
                    </div>
                </div>

            </div>
            <div>

            </div>
        </div>
    );
}

export default AdminDashboard;