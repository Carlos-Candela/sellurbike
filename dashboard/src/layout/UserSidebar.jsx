import React from "react";
import { FaShoppingCart, FaDollarSign, FaBox, FaComments, FaHeart, FaCog, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserSidebar = () => {
  return (
    <div className="w-[250px] h-screen bg-white shadow-md flex flex-col justify-between border-r-1 border-gray-300">
      {/* Sección superior: Imagen, nombre y valoración del usuario */}
      <div className="flex flex-col items-center">
        <img
          src="https://via.placeholder.com/100" // Reemplaza con la URL de la imagen del usuario
          alt="Usuario"
          className="w-24 h-24 rounded-full shadow-md mb-4"
        />
        <h2 className="text-lg font-semibold text-gray-800">Nombre del Usuario</h2>
        {/* Valoración del vendedor */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-sm" />
          ))}
          <span className="ml-2 text-sm text-gray-600">(4.5)</span>
        </div>
        <div className="mt-6 flex flex-col gap-4 px-4">
        <button className="flex items-center gap-3 text-gray-700 hover:bg-blue-200 p-2 rounded-md cursor-pointer">
          <FaShoppingCart className="text-lg" />
          <span>Compras</span>
        </button>
        <button className="flex items-center gap-3 text-gray-700 hover:bg-blue-200 p-2 rounded-md cursor-pointer">
          <FaDollarSign className="text-lg" />
          <span>Ventas</span>
        </button>
        <Link to="/seller/products">
          <button className="flex items-center gap-3 text-gray-700 hover:bg-blue-200 p-2 rounded-md cursor-pointer">
            <FaBox className="text-lg" />
            <span>Productos</span>
          </button>
        </Link>
        <Link to="/seller/chat/:customerId">
          <button className="flex items-center gap-3 text-gray-700 hover:bg-blue-200 p-2 rounded-md cursor-pointer">
            <FaComments className="text-lg" />
            <span>Chat</span>
          </button>
        </Link>
        <button className="flex items-center gap-3 text-gray-700 hover:bg-blue-200 p-2 rounded-md cursor-pointer">
          <FaHeart className="text-lg" />
          <span>Favoritos</span>
        </button>
        <button className="flex items-center gap-3 text-gray-700 hover:bg-blue-200 p-2 rounded-md cursor-pointer">
          <FaCog className="text-lg" />
          <span>Configuración</span>
        </button>
      </div>
      </div>

      {/* Opciones del Sidebar */}
      

      {/* Espaciador inferior */}
      <div className="p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SellURBike
      </div>
    </div>
  );
};

export default UserSidebar;