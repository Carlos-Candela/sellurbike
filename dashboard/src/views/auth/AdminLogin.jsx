import React, { useState } from "react";
import logo from "../../assets/sellurbike.png";
import { useDispatch } from "react-redux";
import { admin_login } from "../../store/Reducers/authReducer";

const AdminLogin = () => {

  const dispatch = useDispatch();

  const [formLoginData, setFormLoginData] = useState({
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setFormLoginData({
      ...formLoginData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(admin_login(formLoginData))
    //console.log(formLoginData);
  };
  return (
    <>
      <div className="min-w-screen min-h-screen bg-[#c9c4f4] flex justify-center items-center">
        <div className="w-[450px] text-[#ffffff] p-2">
          <div className="bg-[#6f68d1] p-4 rounded-md">
            <img src={logo} alt="SellURBike" className="mx-auto" />
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
                  required
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
                  required
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
