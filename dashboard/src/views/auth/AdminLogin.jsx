import React, { useEffect, useState } from "react";
import logo from "../../assets/sellurbike.png";
import { useDispatch, useSelector } from "react-redux";
import { admin_login, messageClear } from "../../store/Reducers/authReducer";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loaderStyleOverride } from "../../../utils/utils";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

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
    dispatch(admin_login(formLoginData));
    //console.log(formLoginData);
  };


  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/admin/dashboard");
    }
  }, [errorMessage, successMessage, dispatch, navigate]);

  return (
    <>
      <div className="min-w-screen min-h-screen bg-[#c9c4f4] flex justify-center items-center">
        <div className="w-[450px] text-[#ffffff] p-2">
          <div className="bg-[#6f68d1] p-4 rounded-md">
            <img
              src={logo}
              alt="SellURBike"
              className="mx-auto w-[250px] h-auto m-8"
            />
            <form className="" onSubmit={submit}>
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
                  "Iniciar Sesión"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
