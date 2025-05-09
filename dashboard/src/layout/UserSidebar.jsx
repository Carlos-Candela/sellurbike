import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaDollarSign, FaBox, FaComments, FaHeart, FaCog, FaStar, FaHome, FaCompass, FaPlus, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserSidebar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around items-center border-t-2 border-gray-300 py-2">
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
  }

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
        <Link to="/user/products">
          <button className="flex items-center gap-3 text-gray-700 hover:bg-blue-200 p-2 rounded-md cursor-pointer">
            <FaBox className="text-lg" />
            <span>Productos</span>
          </button>
        </Link>
        <Link to="/user/chat/:customerId">
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