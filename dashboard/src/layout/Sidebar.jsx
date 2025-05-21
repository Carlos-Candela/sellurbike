import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/sellurbike.png";
import { getNav } from "../navigation/index.js";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {logout} from '../store/Reducers/authReducer.js'

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, [role]);

  const handleLogout = () =>{
    dispatch(logout());
    navigate("/login")
  }
  //console.log(allNav);
  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#5d81a380] top-0 left-0 z-10`}
      ></div>
      <div
        className={`w-[260px] fixed bg-blue-100 z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/5%)] transition-all ${
          showSidebar ? "left-0 duration-300"  : "-left-[260px] lg:left-0 duration-300"
        }`}
      >
        <div className="mb-2 h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[170px] h-[40px]">
            <img src={logo} alt="SellURBike" className="w-full h-full" />
          </Link>
        </div>
        <div className="px-[16px]">
          <ul>
            {allNav.map((nav, i) => (
              <li key={i}>
                <Link
                  to={nav.path}
                  onClick={() => setShowSidebar(false)}
                  className={`${
                    pathname === nav.path
                      ? "bg-blue-400 shadow-indigo-500/50 text-white duration-300 w-full font-bold"
                      : "text-[#030811] duration-300 font-bold"
                  } px-[12px] py-[9px] flex items-center gap-2 p-2 rounded-md hover:bg-blue-200 transition-all hover:pl-4 transintion-all w-full mb-1`}
                >
                  <span>{nav.icon}</span>
                  <span>{nav.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="text-[#030811] duration-200 font-bold cursor-pointer
                  px-[12px] py-[9px] flex items-center gap-2 p-2 rounded-md hover:bg-blue-200 transition-all hover:pl-4 transintion-all w-full mb-1"
              >
                <span>
                  <IoMdLogOut />
                </span>
                <span>Cerrar Sesion</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
