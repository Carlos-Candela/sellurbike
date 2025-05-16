import React, { useState, useEffect } from "react";
import UserHeader from "../../layout/UserHeader";
import { FaRegPlusSquare } from "react-icons/fa";
import UserSidebar from "../../layout/UserSidebar";
import UserMobileSidebar from "../../layout/UserMobileSidebar";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from 'react-router-dom'
import {get_category} from '../../store/Reducers/categoryReducer'
import {get_product, update_product, messageClear} from '../../store/Reducers/productReducer'
import { PropagateLoader } from "react-spinners";
import { loaderStyleOverride } from "../../../utils/utils";
import toast from "react-hot-toast";

const EditProduct = () => {
  const dispatch = useDispatch();
  const {productId}= useParams();
  
  const { categories } = useSelector((state) => state.categories);

  const {product, loader, errorMessage, successMessage} = useSelector((state)=>state.product)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    state: "",
    images: Array(6).fill(null)
  });

  const update = (e)=> {
    e.preventDefault()
    const obj = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      state: formData.state,
      productId: productId,
      images: formData.images
    }
    dispatch(update_product(obj))
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => {
        const updatedImages = [...prev.images];
        updatedImages[index] = URL.createObjectURL(file); // Reemplaza la URL existente con la nueva imagen
        return { ...prev, images: updatedImages };
      });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = null; // Elimina la imagen estableciendo el índice como null
      return { ...prev, images: updatedImages };
    });
  };


  useEffect(() => {
          const obj = {
            parPage: '',
            page: '',
            searchValue: ''
          }
          dispatch(get_category(obj))
          
      },[])

  useEffect(()=>{
    dispatch(get_product(productId))
  },[productId])

useEffect(() => {
  // Asegura que siempre haya 6 posiciones en el array de imágenes
  let imgs = Array.isArray(product.images) ? product.images.slice(0, 6) : [];
  while (imgs.length < 6) imgs.push(null);
  setFormData({
    title: product.name || "",
    description: product.description || "",
    price: product.price || "",
    category: product.category || "",
    state: product.state || "",
    images: imgs,
  });
}, [product]);

useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      
    }
  }, [errorMessage, successMessage]);

  return (
    <div>
      <UserHeader />

      <div className="flex">
        <div className="hidden sm:block">
          <UserSidebar />
        </div>
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg pb-20">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Editar Producto
          </h2>
          <form onSubmit={update} className="space-y-5">
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
                type="text"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.title}
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
                id="description"
                name="description"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 h-28 resize-none focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.description}
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
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  value={formData.price}
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
                  className="border border-gray-300 rounded px-4 py-2"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
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
                          src={image}
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
                          onChange={(e) => handleImageUpload(e, index)}
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
                "Actualizar producto"
              )}
            </button>
          </form>
        </div>
      </div>

      <UserMobileSidebar />
    </div>
  );
};

export default EditProduct;
