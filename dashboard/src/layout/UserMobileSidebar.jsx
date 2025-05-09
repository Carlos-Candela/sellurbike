import React from 'react';
import { FaShoppingCart, FaDollarSign, FaBox, FaComments, FaHeart, FaCog, FaStar, FaHome, FaCompass, FaPlus, FaUser } from "react-icons/fa";

const UserMobileSidebar = () => {
    return (
        <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around items-center border-t-2 border-gray-300 py-2">
                <button className="flex flex-col items-center text-gray-700 hover:text-blue-500">
                  <FaHome className="text-xl" />
                  <span className="text-xs">Inicio</span>
                </button>
                <button className="flex flex-col items-center text-gray-700 hover:text-blue-500">
                  <FaCompass className="text-xl" />
                  <span className="text-xs">Explorar</span>
                </button>
                <button className="flex flex-col items-center text-gray-700 hover:text-blue-500">
                  <FaPlus className="text-xl" />
                  <span className="text-xs">Añadir</span>
                </button>
                <button className="flex flex-col items-center text-gray-700 hover:text-blue-500">
                  <FaComments className="text-xl" />
                  <span className="text-xs">Chat</span>
                </button>
                <button className="flex flex-col items-center text-gray-700 hover:text-blue-500">
                  <FaUser className="text-xl" />
                  <span className="text-xs">Perfil</span>
                </button>
              </div>
    );
};

export default UserMobileSidebar;