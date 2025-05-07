import React from 'react';
import { Search } from 'lucide-react';

import logo from "../assets/sellurbike.png";
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa"; // Asegúrate de importar el ícono de búsqueda

const UserHeader = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="w-[170px] h-[40px] hidden md:block">
        <img src={logo} alt="SellURBike" className="w-full h-full" />
      </Link>

      {/* Search Bar */}
      <div className="flex-grow max-w-xl mx-auto ml-3 mr-3">
        <div className="flex items-center bg-white rounded-full shadow-md p-2 w-full">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="flex-grow px-4 py-2 rounded-l-full focus:outline-none"
          />
          <button className="bg-gray-400 text-white p-2 rounded-full hover:bg-gray-700">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex space-x-4 justify-center items-center">
        <a href="#" className="text-gray-700 hover:text-indigo-600 hidden md:block">Categorías</a>
        <Link to="/login">
          <a href="#" className="text-gray-700 hover:text-indigo-600 hidden md:block">Login</a>
        </Link>
        <button className="bg-indigo-300 p-2 border border-gray-300 rounded-full cursor-pointer hover:bg-indigo-400">
          <div className="flex justify-center items-center">
            <FaPlus className="text-gray-700" />
            <h2 className="font-bold text-gray-700 hidden md:flex md:w-[70px] md:justify-center md:items-center">Añadir</h2>
          </div>
        </button>
      </nav>
    </header>
  );
};

export default UserHeader;