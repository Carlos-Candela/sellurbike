import React from "react";
import { Search } from "lucide-react";
import logoApp from "../assets/AppLogoSellurbike.png";
import logo from "../assets/sellurbike.png";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserHeader = () => {
  
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className=" bg-white shadow-md px-2 py-2 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="w-[40px] h-[40px] md:w-[170px] ml-2 mr-2 ">
        <img
          src={logo}
          alt="SellURBike"
          className="w-full h-full hidden md:block" // Logo principal visible en pantallas medianas y grandes
        />
        <img
          src={logoApp}
          alt="AppLogoSellURBike"
          className="w-[40px] h-[40px] md:hidden" // Logo de la app visible en pantallas pequeñas
        />
      </Link>

      {/* Search Bar */}
      <div className="flex-grow max-w-[200px] sm:max-w-[500px] mx-auto ml-2 mr-2">
        <div className="flex items-center bg-white rounded-full shadow-md p-1 w-full">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="flex-grow px-2 py-1 rounded-l-full focus:outline-none text-sm"
          />
          <button className="bg-gray-400 text-white p-2 rounded-full hover:bg-gray-700">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex space-x-4 justify-center items-center">
        <Link to="/user/profile">
          <div className="flex flex-col items-center justify-center">
            <img
  src={userInfo.image ? userInfo.image : "/images/user.png"}
  alt={userInfo.name}
  className="w-[40px] h-[40px] rounded-full shadow-lg mb-1 object-cover"
/>
            <h2 className="text-xs font-semibold text-gray-800 text-center">{`${userInfo.name}`}</h2>
          </div>
        </Link>
        <Link to="/user/add-product">
          <button className="bg-gradient-to-br from-indigo-200 to-indigo-500 p-2 border border-gray-300 rounded-full cursor-pointer hover:bg-indigo-400 hidden md:block">
            <div className="flex justify-center items-center">
              <FaPlus className="text-gray-700" />
              <h2 className="font-bold text-gray-700 hidden md:flex md:w-[70px] md:justify-center md:items-center">
                Añadir
              </h2>
            </div>
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default UserHeader;
