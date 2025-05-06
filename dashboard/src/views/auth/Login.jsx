import React, { useState } from "react";
import logo from "../../assets/sellurbike.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import logoApp from "../../assets/AppLogoSellurbike.png"

const Login = () => {
  const [formLoginData, setFormLoginData] = useState({
    email: "",
    password: "",
    });
  
    const inputHandle = (e) => {
      setFormLoginData({
        ...formLoginData,
        [e.target.name]: e.target.value,
      });
    }
    
    const submit = (e) => {
      e.preventDefault();
      console.log(formLoginData);
    }
  return (
    <>
      <div className="min-w-screen min-h-screen bg-[#e5e3f3] flex justify-center items-center">
        <div className="w-[450px] text-[#ffffff] p-2">
          <div className="bg-[#6f68d1] p-4 rounded-md shadow-xl">
            <div className="w-full flex justify-center">
            <img src={logoApp} alt="SellURBike" className="w-[40%] h-[40%] m-6 align-middle" />
            </div>
            
            <p className="flex justify-center items-center mb-3">
              Por favor, inicia sesión con tu cuenta.
            </p>
            <form onSubmit={submit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Correo Electrónico
                </label>
                <input
                  onChange={inputHandle}
                  value={formLoginData.email}
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 mt-1 
              text-gray-700 bg-gray-200 rounded-md focus:outline-none 
              focus:ring focus:ring-indigo-100 focus:bg-white"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Contraseña
                </label>
                <input
                  onChange={inputHandle}
                  value={formLoginData.password}
                  type="password"
                  name="password"
                  id="password"
                  className="w-full 
              px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md 
              focus:outline-none focus:ring focus:ring-indigo-100 focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#161271] text-white 
            font-bold rounded-md hover:bg-[#232342] focus:outline-none 
            focus:ring focus:ring-indigo-100 focus:bg-white cursor-pointer"
              >
                Iniciar Sesión
              </button>
              <div>
                <p className="text-center mt-4 text-white">
                  ¿Todavía no dispones de una cuenta?{" "}
                  <Link to="/register" className="text-white font-bold">
                    Registrate aquí
                  </Link>
                </p>
              </div>

              <div className="w-full flex justify-center items-center mb-3">
                <div className="w-[45%] bg-slate-700 h-[1px]"></div>
                <div className="w-[10%] flex justify-center items-center">
                  <span className="pb-1">O</span>
                </div>
                <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              </div>
              <div
                id="box-out-connects"
                className="flex justify-center items-center gap-3"
              >
                <div className="flex justify-center items-center gap-3">
                  <div
                    className="w-[135px] h-[45px] flex rounded-md bg-orange-700 shadow-lg 
              hover:shadow-orange-700/50 justify-center cursor-pointer 
              items-center overflow-hidden"
                  >
                    <span>
                      <FaGoogle />
                    </span>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-3">
                  <div
                    className="w-[135px] h-[45px] flex rounded-md bg-blue-700 shadow-lg 
              hover:shadow-blue-700/50 justify-center cursor-pointer 
              items-center overflow-hidden"
                  >
                    <span>
                      <FaFacebookF />
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
