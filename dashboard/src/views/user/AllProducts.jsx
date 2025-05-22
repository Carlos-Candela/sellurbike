import React, { useState, useEffect } from "react";
import UserHeader from "../../layout/UserHeader";
import Pagination from "../Pagination";
import UserSidebar from "../../layout/UserSidebar";
import UserMobileSidebar from "../../layout/UserMobileSidebar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  get_products,
  product_delete,
  messageClear,
} from "../../store/Reducers/productReducer";
import toast from "react-hot-toast";

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, totalProduct, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParpage] = useState(5);

  const handleDelete = async (id) => {
    dispatch(product_delete(id));
  };
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
     
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [dispatch, searchValue, currentPage, parPage]);

  return (
    <div>
      <UserHeader />
      <div className="flex">
        <div className="hidden sm:block">
          <UserSidebar />
        </div>
        <div className="w-full sm:w-[85%] md:w-[95%] px-4 py-6 mb-20">
          <h2 className="text-2xl font-bold mb-4">Todos</h2>
          <div className="flex justify-center items-center gap-2 mb-6">
            <select
              onChange={(e) => setParpage(parseInt(e.target.value))}
              className="px-4 py-2 border-1 hover:shadow-gray-800/50 outline-none  text-[#d0d2d6] rounded-xl shadow-lg"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full p-2 border border-gray-300 rounded-xl"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {products.map((product, i) => (
              <Link
                to={`/user/product-detail/${product._id}`}
                key={i}
                className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition w-[80%] sm:w-[85%] md:w-[95%]"
              >
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : "/images/no-photos.png"
                  }
                  alt={product.name || "Imagen predeterminada"}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute w-[90%] top-2 right-2 flex gap-2 justify-between z-10">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/user/edit-product/${product._id}`);
                    }}
                    className="px-3 py-1 bg-gradient-to-br from-indigo-200 to-indigo-500 text-black rounded-full text-sm hover:bg-blue-900"
                  >
                    Editar
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(product._id);
                    }}
                    className="px-3 py-1 bg-red-500 text-black rounded-full text-sm hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
                <div className="p-4 bg-gray-200">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-700 mb-4">{product.price} €</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="w-full justify-end flex mt-4">
            {totalProduct <= parPage ? (
              ""
            ) : (
              <Pagination
                pageNumber={currentPage} // Página actual
                setPageNumber={setCurrentPage} // Función para cambiar la página
                totalItems={totalProduct} // Total de productos (debería venir del backend)
                parPage={parPage} // Productos por página
                showItem={3} // Número de botones de página visibles
              />
            )}
          </div>
        </div>
      </div>
      <UserMobileSidebar />
    </div>
  );
};

export default AllProducts;
