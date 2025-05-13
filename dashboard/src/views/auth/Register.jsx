import React, { useState, useEffect } from "react";
import logo from "../../assets/sellurbike.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { loaderStyleOverride } from "../../../utils/utils";
import { user_register } from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {  messageClear } from "../../store/Reducers/authReducer";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { loader, errorMessage, successMessage } = useSelector((state) => state.auth);

const [formData, setFormData] = useState({
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false, 
});

  const inputHandle = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {

    e.preventDefault();
    
    if (formData.name === "" || formData.surname === "" || formData.email === "" || formData.password === "") {
      toast.error("Por favor, complete todos los campos");
      return;
    }
    if (!formData.email.includes("@")) {
      toast.error("Por favor, ingrese un correo electrónico válido");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (!formData.terms) {
      toast.error("Por favor, acepte los términos y condiciones");
      return;
    }
    const {confirmPassword, terms, ...dataToSend} = formData
    dispatch(user_register(dataToSend));
  };

  useEffect(() => {
      if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
      }
      if (successMessage) {
        toast.success(successMessage);
        dispatch(messageClear());
        navigate('/');
      }
    }, [errorMessage, successMessage, dispatch, navigate]);

  return (
    <div className="min-w-screen min-h-screen bg-[#c9c4f4] flex justify-center items-center">
      <div className="w-[450px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <img src={logo} alt="SellURBike" className="mx-auto" />
          <h2 className="text-xl mb-3 font-bold text-center">
            Bienvenido a SellURBike
          </h2>
          <p className="flex justify-center items-center mb-3">
            Proporcione los datos para su registro
          </p>
          <form onSubmit={submit}>
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-white"
              >
                Nombre
              </label>
              <input
                onChange={inputHandle}
                value={formData.name}
                type="text"
                name="name"
                id="name"
                className="w-full px-3 py-2 mt-1 text-gray-700 
              bg-gray-200 rounded-md focus:outline-none focus:ring
              focus:ring-indigo-100 focus:bg-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="apellidos"
                className="block text-sm font-medium text-white"
              >
                Apellidos
              </label>
              <input
                onChange={inputHandle}
                value={formData.surname}
                type="text"
                name="surname"
                id="surname"
                className="w-full px-3 py-2 mt-1
              text-gray-700 bg-gray-200 rounded-md focus:outline-none 
              focus:ring focus:ring-indigo-100 focus:bg-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Correo Electrónico
              </label>
              <input
                onChange={inputHandle}
                value={formData.email}
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
                value={formData.password}
                type="password"
                name="password"
                id="password"
                className="w-full 
              px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md 
              focus:outline-none focus:ring focus:ring-indigo-100 focus:bg-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Confirmar Contraseña
              </label>
              <input
                onChange={inputHandle}
                value={formData.confirmPassword}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="w-full 
              px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md focus:outline-none 
              focus:ring focus:ring-indigo-100 focus:bg-white"
              />
            </div>
            <div>
              <label htmlFor="terms" className="inline-flex items-center mb-4">
                <input
                  onChange={inputHandle}
                  type="checkbox"
                  checked={formData.terms}
                  name="terms"
                  id="terms"
                  className="rounded border-gray-300 text-[#6f68d1] shadow-sm focus:ring-[#6f68d1] focus:ring-offset-[#6f68d1] focus:ring-offset-2 focus:ring focus:outline-none"
                />
                <span className="ml-2 text-sm text-white">
                  Acepto los{" "}
                  <a
                    href="#"
                    className="text-white 
                font-bold"
                  >
                    Términos de Servicio
                  </a>{" "}
                  y la{" "}
                  <a
                    href="#"
                    className="text-white 
                font-bold"
                  >
                    Política de Privacidad
                  </a>
                </span>
              </label>
            </div>
            <button
              disabled={loader ? true : false}
              type="submit"
              className="w-full py-2 px-4 bg-[#161271] text-white 
            font-bold rounded-md hover:bg-[#232342] focus:outline-none 
            focus:ring focus:ring-indigo-100 focus:bg-white cursor-pointer"
            >
              {loader ? (
                <PropagateLoader
                  color="#ffffff"
                  cssOverride={loaderStyleOverride}
                />
              ) : (
                "Registrarse"
              )}
            </button>
            <div>
              <p className="text-center mt-4 text-white">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className="text-white font-bold">
                  Inicia Sesión
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
  );
};
export default Register;
