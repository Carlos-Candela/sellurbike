import React from 'react';
import { FaShoppingCart, FaDollarSign, FaBox, FaComments, FaHeart, FaCog, FaStar, FaHome, FaCompass, FaPlus, FaUser } from "react-icons/fa";
import {Link} from "react-router-dom";

const UserMobileSidebar = () => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around items-center border-t-2 border-gray-300 py-2">
                <Link to="/">
                <button className="flex flex-col items-center text-gray-700 hover:text-indigo-500 cursor-pointer">
                  <FaHome className="text-xl" />
                  <span className="text-xs">Inicio</span>
                </button>
                </Link>
                <button className="flex flex-col items-center text-gray-700 hover:text-indigo-500 cursor-pointer">
                  <FaCompass className="text-xl" />
                  <span className="text-xs">Explorar</span>
                </button>
                <Link to="/user/add-product">
                          <button className="relative bg-gradient-to-br from-indigo-200 to-indigo-500 p-4 border border-gray-300 rounded-full cursor-pointer hover:bg-indigo-400 -translate-y-6">
                            <div className="flex justify-center items-center">
                              <FaPlus className="text-gray-700" />
                              <h2 className="font-bold text-gray-700 hidden md:flex md:w-[70px] md:justify-center md:items-center">
                                Añadir
                              </h2>
                            </div>
                          </button>
                        </Link>
                <Link to="/user/chat">
                <button className="flex flex-col items-center text-gray-700 hover:text-indigo-500 cursor-pointer">
                  <FaComments className="text-xl" />
                  <span className="text-xs">Chat</span>
                </button>
                </Link>
                <Link to = "/user/profile">
                <button className="flex flex-col items-center text-gray-700 hover:text-indigo-500 cursor-pointer">
                  <FaUser className="text-xl" />
                  <span className="text-xs">Perfil</span>
                </button>
                </Link>
              </div>
    );
};

export default UserMobileSidebar;