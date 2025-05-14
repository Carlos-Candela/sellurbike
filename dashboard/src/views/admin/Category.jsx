import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaImage, FaTrash } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { categoryAdd } from "../../store/Reducers/categoryReducer";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { loaderStyleOverride } from "../../../utils/utils";
import api from "../../api/api"
import toast from "react-hot-toast";
import { messageClear } from '../../store/Reducers/categoryReducer';

const Category = () => {

  const dispatch = useDispatch();

  const { loader, successMessage, errorMessage } = useSelector((state) => state.categories);

  const categories = []

  const [currentePage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParpage] = useState(5);
  const [show, setShow] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: ""});
  const [imageShow, setImage] = useState('');

const [state, setState]= useState({
  name: "",
  image: "",
})


const imageHandle = (e)=>{
  const files = e.target.files
  if(files.length > 0){
    setImage(URL.createObjectURL(files[0]))
    setState({...state,image: files[0]})
  }
}

const add_category = (e) => {
  e.preventDefault();
  
  dispatch(categoryAdd(state))
}


  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  useEffect(() => {
            if (errorMessage) {
              toast.error(errorMessage);
              dispatch(messageClear());
            }
            if (successMessage) {
              toast.success(successMessage);
              dispatch(messageClear());
              setState({name: "",image: ""});
              setImage("")
              console.log(state)
            }
          }, [errorMessage, successMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md">
        <h1 className="text-[#d0d2d6] font-semibold text-xl">Categoria</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-red-500 shadow-lg hover:shadow-red-500/50 px-4 py-2 cursor-pointer text-white rounded-sm"
        >
          Añadir
        </button>
      </div>
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
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-black">
                      No hay categorías disponibles.
                    </td>
                  </tr>
                ) : ( <p>falta map categorias</p>/*
                  categories.map((category, i) => (
                    <tr key={i}>
                      <td className="py-1 px-6 font-medium whitespace-nowrap">
                        {i + 1}
                      </td>
                      <td className="py-1 px-6 font-medium whitespace-nowrap">
                        <img
                          className="w-[50px] h-[50px] rounded-xl shadow-lg"
                          src={`http://localhost:5173/images/category/${category.name}.jpg`}
                          alt={category.name}
                        />
                      </td>
                      <td className="py-1 px-6 font-medium whitespace-nowrap">
                        {category.name}
                      </td>
                      <td className="py-1 px-6 font-medium whitespace-nowrap">
                        <div className="flex justify-start items-center gap-2">
                          <Link className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(category._id)}
                            className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
               */ )}
              </tbody>
            </table>
          </div>
          <div className="w-full justify-end flex mt-4">
            {categories.length > parPage && (
              <Pagination
                pageNumber={currentePage}
                setPageNumber={setCurrentPage}
                totalItems={categories.length}
                parPage={parPage}
                showItem={3}
              />
            )}
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 lg:relative lg:right-0 fixed 
            ${
              show ? "right-0" : "-right-[340px]"
            } z-[9999] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div
              className={`bg-[#6a5fdf] ${
                show ? "bg-[#868cd3]" : "bg-[#6a5fdf]"
              } h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6] transition-all duration-500`}
            >
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center">
                  Añadir Categoria
                </h1>
                <div
                  onClick={() => setShow(false)}
                  className=" w-[25px]  bg-red-500 hover:shadow-red-500/50 h-[25px] rounded-md block lg:hidden mb-4"
                >
                  <button className="flex justify-center items-center w-full h-full text-white cursor-pointer">
                    <IoMdCloseCircleOutline />
                  </button>
                </div>
              </div>
              <form onSubmit={add_category}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold" htmlFor="name">
                      Nombre
                    </label>
                    <input
                      onChange={(e)=> setState({...state, name: e.target.value})}
                      value={state.name}
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
                      {
                        imageShow ? <img className="w-full h-full" src={imageShow} alt="categoryImg" /> : 
                        <>
                        <span>
                        <FaImage className="text-5xl text-[#d0d2d6] mb-2" />
                        </span>
                        <span>Selecciona la imagen</span>
                        </>
                      }
                      
                    </label>
                    <input
                      onChange={imageHandle}
                      id="image"
                      name="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
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
                  "Añadir Categoria"
                )}
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
