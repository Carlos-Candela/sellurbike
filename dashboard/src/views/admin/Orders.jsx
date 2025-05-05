import React, { useState } from "react";
import { LuDownload } from "react-icons/lu";
import {Link} from "react-router-dom";
import Pagination from "../Pagination";


const Orders = () => {
  const [currentePage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParpage] = useState(5);
  const [show,setShow] = useState(false);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setParpage(parseInt(e.target.value))}
            className="px-4 py-2 border-1 hover:shadow-gray-800/50 outline-none bg-[#6a5fdf] text-[#d0d2d6] rounded-md shadow-lg"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>

          <input
            type="text"
            placeholder="Buscar..."
            className="px-4 py-2 border-1 hover:shadow-gray-800/50 outline-none bg-[#6a5fdf] text-[#d0d2d6] rounded-md shadow-lg"
          ></input>
        </div>

        <div className="relative mt-5 overflow-x-auto">
            <div className="w-full text-sm text-left bg-[#6a5fdf]">
                <div className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                    <div className="flex justify-between items-center">
                        <div className="py-3 w-[25%] font-bold">Id pedido</div>
                        <div className="py-3 w-[25%] font-bold">Precio</div>
                        <div className="py-3 w-[25%] font-bold">Estado pago</div>
                        <div className="py-3 w-[25%] font-bold">Estado pedido</div>
                        <div className="py-3 w-[25%] font-bold">Accion</div>
                        <div className="py-3 w-[25%] font-bold"><LuDownload/></div>
                    </div>
                </div>
                <div className="text-[#d0d2d6]">
                    <div className="flex justify-between items-start border-b border-slate-700">
                        <div className="py-3 w-[25%] font-medium whitespace-nowrap">#653623</div>
                        <div className="py-3 w-[25%] font-medium">3.000€</div>
                        <div className="py-3 w-[25%] font-medium">Pendiente</div>
                        <div className="py-3 w-[25%] font-medium">Pendiente</div>
                        <div className="py-3 w-[25%] font-medium">
                          <Link to='/admin/dashboard/order/details/3'>Ver más</Link>
                        </div>
                        <div className="py-3 w-[25%] font-medium"><LuDownload/></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full justify-end flex mt-4">
        <Pagination
          pageNumber={currentePage}
          setPageNumber={setCurrentPage}
          totalItems={50}
          parPage={parPage}
          showItem = {3}
        />
        </div>
      </div>
    </div>
  );
};

export default Orders;
