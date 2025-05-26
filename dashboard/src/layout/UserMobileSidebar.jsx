import React from 'react';
import { FaArchive, FaComments, FaHome, FaPlus, FaUser, FaProductHunt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserMobileSidebar = () => {
    const navigate = useNavigate();
    return (
       <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-between items-center border-t-2 border-gray-300 py-2 z-50">
  <button className="flex flex-col items-center text-gray-700 hover:text-indigo-500 cursor-pointer w-1/5" onClick={() => navigate("/")}>
    <FaHome className="text-xl" />
    <span className="text-xs">Inicio</span>
  </button>
  <button className="flex flex-col items-center text-gray-700 hover:text-indigo-500 cursor-pointer w-1/5" onClick={() => navigate("/user/products")}>
    <FaArchive className="text-xl" />
    <span className="text-xs">Productos</span>
  </button>
  <div className="w-1/5 flex justify-center relative z-10">
    <button className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-br from-indigo-200 to-indigo-500 p-4 border border-gray-300 rounded-full cursor-pointer hover:bg-indigo-400 shadow-lg" onClick={() => navigate("/user/add-product")}>
      <FaPlus className="text-gray-700" />
    </button>
  </div>
  <button className="flex flex-col items-center text-gray-700 hover:text-indigo-500 cursor-pointer w-1/5" onClick={() => navigate("/user/chat")}>
    <FaComments className="text-xl" />
    <span className="text-xs">Chat</span>
  </button>
  <button className="flex flex-col items-center text-gray-700 hover:text-indigo-500 cursor-pointer w-1/5" onClick={() => navigate("/user/orders")}>
    <FaProductHunt className="text-xl" />
    <span className="text-xs">Pedidos</span>
  </button>
</div>
    );
};

export default UserMobileSidebar;