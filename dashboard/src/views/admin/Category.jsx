import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaImage, FaTrash } from "react-icons/fa";

const Category = () => {
  const [currentePage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParpage] = useState(5);
  const [show, setShow] = useState(false);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12 bg-[#6a5fdf] rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center">
            <select
              onChange={(e) => setParpage(parseInt(e.target.value))}
              className="px-4 py-2 border-1 hover:shadow-gray-800/50 outline-none bg-[#6a5fdf] text-[#d0d2d6] rounded-md shadow-lg"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>

            <input
              type="text"
              placeholder="Buscar..."
              className="px-4 py-2 border-1 hover:shadow-gray-800/50 outline-none bg-[#6a5fdf] text-[#d0d2d6] rounded-md shadow-lg"
            ></input>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-md text-[#d0d2d6] text-left">
              <thead className="text-sm text-[#d0d2d6] border-slate-600 uppercase border-b">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Imagen
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((d, i) => (
                  <tr key={i}>
                    <td
                      scope="row"
                      className="py-1 px-6 font-medium whitespace-nowrap"
                    >
                      {d}
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-6 font-medium whitespace-nowrap"
                    >
                      <img
                        className="w-[50px] h-[50px] rounded-full shadow-lg"
                        src={`http://localhost:5173/images/category/${d}.jpg`}
                        alt=""
                      />
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-6 font-medium whitespace-nowrap"
                    >
                      Pendiente
                    </td>

                    <td
                      scope="row"
                      className="py-1 px-6 font-medium whitespace-nowrap"
                    >
                      <div className="flex justify-start items-center gap-2">
                        <Link className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                          <FaEdit />
                        </Link>
                        <Link className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                          <FaTrash />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full justify-end flex mt-4">
            <Pagination
              pageNumber={currentePage}
              setPageNumber={setCurrentPage}
              totalItems={50}
              parPage={parPage}
              showItem={3}
            />
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-20 top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#6a5fdf] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
              <h1 className="text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center">
                Añadir Categoria
              </h1>
              <form>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold" htmlFor="name">
                      Nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Nombre de la categoria"
                      className="px-4 py-2 border-1 hover:shadow-gray-800/50 outline-none bg-[#ffffff] text-[#000000] rounded-md shadow-lg"
                    ></input>
                  </div>
                  <div className="">
                    <label
                      className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-indigo-200 w-full border-[#d0d2d6]"
                      htmlFor="image"
                    >
                      <span>
                        <FaImage className="text-5xl text-[#d0d2d6] mb-2" />
                      </span>
                      <span>Selecciona la imagen</span>
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                    
                  </div>
                  <button
                    type="submit"
                    className="bg-red-600 px-4 py-2 rounded-md hover:shadow-lg hover:shadow-red-500/50"
                  >
                    Añadir Categoria
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
