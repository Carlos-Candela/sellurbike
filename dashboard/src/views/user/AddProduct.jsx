import React, { useEffect, useState } from "react";
import UserHeader from "../../layout/UserHeader";
import { FaRegPlusSquare } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import UserSidebar from "../../layout/UserSidebar";
import UserMobileSidebar from "../../layout/UserMobileSidebar";
import { add_product, messageClear } from "../../store/Reducers/productReducer";
import { PropagateLoader } from "react-spinners";
import { loaderStyleOverride } from "../../../utils/utils";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import { get_category } from "../../store/Reducers/categoryReducer"; 

function AddProduct() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );
   const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParpage] = useState(5);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    state: "pending",
    images: Array(6).fill(null),
  });

  useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData((prev) => ({ ...prev, category: categories[0].name }));
    }
  }, [categories, formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => {
        const updatedImages = [...prev.images];
        const firstEmptyIndex = updatedImages.findIndex(img => img === null);
        if (firstEmptyIndex !== -1) {
          updatedImages[firstEmptyIndex] = file;
        }
        return { ...prev, images: updatedImages };
      });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = null;
      return { ...prev, images: updatedImages };
    });
  };

  useEffect(() => {
    
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        state: "pending",
        images: Array(6).fill(null),
      });
    }
  }, [errorMessage, successMessage, dispatch]);

  useEffect(() => {
      const obj = {
        parPage: "",
        page: "",
        searchValue: "",
      };
      dispatch(get_category(obj));
    }, [searchValue, currentPage, parPage]);

  const add = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.title);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("category", formData.category);
    formDataToSubmit.append("state", formData.state);
    for (let i = 0; i < formData.images.length; i++) {
      if (formData.images[i]) {
        formDataToSubmit.append("images", formData.images[i]);
      }
    }
    dispatch(add_product(formDataToSubmit));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      <div className="flex">
        <div className="hidden sm:block">
          <UserSidebar />
        </div>
        <main className="flex-1 flex flex-col items-center justify-start px-2 sm:px-8 py-8">
          <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 mb-10">
            <Link to='/user/products'>
              <button className="block sm:hidden w-auto mb-4 py-2 px-4 bg-gradient-to-br from-indigo-200 to-indigo-500 text-gray-800 
      font-bold rounded-md hover:bg-[#232342] focus:outline-none 
      focus:ring focus:ring-indigo-100 focus:bg-white cursor-pointer">
      Todos mis productos
    </button>
            </Link>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Añadir nuevo articulo
            </h2>
            <form onSubmit={add} className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Título
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  type="text"
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  id="description"
                  name="description"
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    Precio (€)
                  </label>
                  <input
                    value={formData.price}
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block font-medium text-gray-700 mb-1"
                  >
                    Categoría
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-4 py-2"
                  >
                    {categories.map((element, i) => (
                      <option key={i} value={element.name}>
                        {element.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Fotos del producto (máximo 6)
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-full h-24 border border-gray-300 rounded-md flex items-center justify-center bg-gray-100"
                    >
                      {image ? (
                        <>
                          <img
                            src={typeof image === "string" ? image : URL.createObjectURL(image)}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute w-[25px] h-[25px] top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-800"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <label
                          htmlFor={`image-${index}`}
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                        >
                          <FaRegPlusSquare className="text-2xl" />
                          <input
                            id={`image-${index}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <button
                disabled={loader ? true : false}
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-br from-indigo-200 to-indigo-500 text-gray-800 
                  font-bold rounded-md hover:bg-[#232342] focus:outline-none 
                  focus:ring focus:ring-indigo-100 focus:bg-white cursor-pointer"
              >
                {loader ? (
                  <PropagateLoader
                    color="#ffffff"
                    cssOverride={loaderStyleOverride}
                  />
                ) : (
                  "Añadir Producto"
                )}
              </button>
            </form>
          </div>
        </main>
        <UserMobileSidebar />
      </div>
    </div>
  );
}

export default AddProduct;