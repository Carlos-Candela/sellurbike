import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/sellurbike.png";
import { getNav } from "../navigation/index.js";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNav("admin");
    setAllNav(navs);
  }, []);
  //console.log(allNav);
  return (
    <div>
      <div></div>
      <div
        className={`w-[260px] fixed bg-blue-100 z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/5%)] transition-all`}
      >
        <div className="mb-2 h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[170px] h-[40px]">
            <img
              src={logo}
              alt="SellURBike"
              className="w-full h-full"
            />
          </Link>
        </div>
        <div className="px-[16px]">
          <ul>
            {allNav.map((nav, i) => (
              <li key={i}>
                <Link
                  to={nav.path}
                  className={`${
                    pathname === nav.path
                      ? "bg-blue-500 shadow-indigo-500/50 text-white duration-500 w-full"
                      : "text-[#030811] duration-200"
                  } px-[12px] py-[9px] flex justify-center items-center gap-2 p-2 rounded-md hover:bg-blue-200 transition-all hover:pl-4 transintion-all w-full mb-1`}
                >
                  <span >{nav.icon}</span>
                  <span >{nav.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
