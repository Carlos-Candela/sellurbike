import React from 'react';
import { FaArchive, FaComments, FaHome, FaPlus, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserMobileSidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around items-center border-t-2 border-gray-300 py-2 z-50">
            <button
                className="flex flex-col items-center text-gray-700 hover:text-indigo-500 cursor-pointer"
                onClick={() => navigate("/")}
            >
                <FaHome className="text-xl" />
                <span className="text-xs">Inicio</span>
            </button>
            <button
                className="flex flex-col items-center text-gray-700 hover:text-indigo-500 cursor-pointer"
                onClick={() => navigate("/user/products")}
            >
                <FaArchive className="text-xl" />
                <span className="text-xs">Productos</span>
            </button>
            <button
                className="relative bg-gradient-to-br from-indigo-200 to-indigo-500 p-4 border border-gray-300 rounded-full cursor-pointer hover:bg-indigo-400 -translate-y-6"
                onClick={() => navigate("/user/add-product")}
            >
                <div className="flex justify-center items-center">
                    <FaPlus className="text-gray-700" />
                    <h2 className="font-bold text-gray-700 hidden md:flex md:w-[70px] md:justify-center md:items-center">
                        Añadir
                    </h2>
                </div>
            </button>
            <button
                className="flex flex-col items-center text-gray-700 hover:text-indigo-500 cursor-pointer"
                onClick={() => navigate("/user/chat")}
            >
                <FaComments className="text-xl" />
                <span className="text-xs">Chat</span>
            </button>
            <button
                className="flex flex-col items-center text-gray-700 hover:text-indigo-500 cursor-pointer"
                onClick={() => navigate("/user/profile")}
            >
                <FaUser className="text-xl" />
                <span className="text-xs">Perfil</span>
            </button>
        </div>
    );
};

export default UserMobileSidebar;