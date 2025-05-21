import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { GrView } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import Search from "../../components/Search"
import {get_seller_request} from '../../store/Reducers/sellerReducer'

const SellerRequest = () => {

  const dispatch = useDispatch();

  const { sellers, totalSeller } = useSelector(state => state.seller);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParpage] = useState(5);
  const [show, setShow] = useState(false);

    useEffect(() => {
      const obj = {
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue
      }
      dispatch(get_seller_request(obj))
      
    },[searchValue, currentPage, parPage])

  return (
    <div className="px-2 sm:px-4 lg:px-7 pt-5">
      <h1 className="text-xl font-bold mb-4">Solicitud Vendedores</h1>
      <div className="w-full p-2 sm:p-4 bg-[#6a5fdf] rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-stretch sm:items-center">
          <Search setParpage={setParpage} setSearchValue={setSearchValue} searchValue={searchValue} />
        </div>
        {/* Tabla para pantallas medianas en adelante */}
        <div className="relative overflow-x-auto hidden md:block mt-4">
          <table className="w-full text-md text-[#d0d2d6] text-left">
            <thead className="text-sm text-[#d0d2d6] border-slate-600 uppercase border-b">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">No</th>
                <th scope="col" className="px-6 py-3 text-left">Nombre</th>
                <th scope="col" className="px-6 py-3 text-left">Email</th>
                <th scope="col" className="px-6 py-3 text-left">Estado del pago</th>
                <th scope="col" className="px-6 py-3 text-left">Estado</th>
                <th scope="col" className="px-6 py-3 text-left">Acción</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((s, i) => (
                <tr className="border-b border-slate-700" key={i}>
                  <td scope="row" className="py-2 px-6 font-medium whitespace-nowrap">{i+1}</td>
                  <td scope="row" className="py-2 px-6 font-medium whitespace-nowrap">{s.name}</td>
                  <td scope="row" className="py-2 px-6 font-medium whitespace-nowrap">{s.email}</td>
                  <td scope="row" className="py-2 px-6 font-medium whitespace-nowrap">{s.status}</td>
                  <td scope="row" className="py-2 px-6 font-medium whitespace-nowrap">{s.payment}</td>
                  <td scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
                    <div className="flex justify-start items-center gap-2">
                      <Link to={`/admin/dashboard/seller/details/${s._id}`} className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        <GrView />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Cards para móviles */}
        <div className="block md:hidden mt-4 space-y-4">
          {sellers.map((s, i) => (
            <div key={i} className="bg-[#5a50c7] rounded-lg shadow-md p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-bold">No:</span>
                <span>{i+1}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Nombre:</span>
                <span>{s.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Email:</span>
                <span>{s.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Estado del pago:</span>
                <span>{s.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">Estado:</span>
                <span>{s.payment}</span>
              </div>
              <div className="flex justify-start items-center gap-2 mt-2">
                <Link to={`/admin/dashboard/seller/details/${s._id}`} className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                  <GrView />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full justify-end flex mt-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItems={50}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerRequest;