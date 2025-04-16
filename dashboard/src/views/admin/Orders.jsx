import React, { useState } from 'react';

const Orders = () => {
    const [currentePage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParpage] = useState(5)
    
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-lg shadow-lg'>
                <div className='flex justify-between items-center'>
                    <select onChange={(e) => setParpage(parseInt(e.target.value))} className='px-4 py-2 border-1 hover:shadow-gray-800/50 outline-none bg-[#6a5fdf] text-[#d0d2d6] rounded-md shadow-lg'>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>                       
                    </select>
                    
                    <input type='text' placeholder='Buscar...' className='px-4 py-2 border-1 hover:shadow-gray-800/50 outline-none bg-[#6a5fdf] text-[#d0d2d6] rounded-md shadow-lg'></input>
                </div>
            </div>
        </div>
    );
};

export default Orders;