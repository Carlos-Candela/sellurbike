import React from "react";
import { FaList } from "react-icons/fa";



const Header = ({ showSidebar, setShowSidebar }) => {
  

  return (
    <div className="top-0 left-0 w-full ">
      <div className="ml-0 lg:ml-[260px]  h-[65px] flex justify-between items-center bg-[#303031] px-5 transition-all">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm bg-white shadow-lg hover:shadow-gray-500/50 justify-center items-center cursor-pointer"
        >
          <span>
            <FaList />
          </span>
        </div>
        <div className="hidden md:block">
          <input
            type="text"
            className="px-3 py-2 outline-none bg-transparent border-slate-300 border-2 rounded-md text-[#cecccc] overflow-hidden"
            name="search"
            placeholder="Buscar..."
          />
        </div>
        <div className="flex justify-center items-center gap-8 relative">
            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center gap-3">
                    <div className="flex justify-center items-center flex-col text-end">
                        <h2 className="text-md font-bold text-white">Carlos Candela</h2>
                        <span className="text-[14px] w-full font-normal text-white">Admin</span>
                    </div>
                    <img className="w-[45px] h-[45px] rounded-full overflow-hidden border-2" src="http://localhost:5173/images/admin.jpg" alt="admin" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
