import React, { use, useEffect, useState } from "react";
import UserHeader from "../../layout/UserHeader";
import { FaRegPlusSquare } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import UserSidebar from "../../layout/UserSidebar";
import UserMobileSidebar from "../../layout/UserMobileSidebar";


function AddProduct() {
  // Accede a las categorías desde el estado global
  const categories = useSelector((state) => state.categories.categories); 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    state: "pending",
    images: Array(6).fill(null), // Inicializa un array de 6 posiciones con `null`
  });

  useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData((prev) => ({ ...prev, category: categories[0].name }));
    }
  }, [categories, formData.category]); // Agrega formData.category como dependencia

  const handleChange = (e) => {
  const { name, value } = e.target;
  console.log(`Campo cambiado: ${name} => ${value}`); // 👈 Verifica si cambia
  setFormData((prev) => ({ ...prev, [name]: value }));
};

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0]; // Obtén el archivo seleccionado
    if (file) {
      setFormData((prev) => {
        const updatedImages = [...prev.images];
        updatedImages[index] = file; // Actualiza la imagen en la posición correspondiente
        return { ...prev, images: updatedImages };
      });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = null; // Elimina la imagen de la posición correspondiente
      return { ...prev, images: updatedImages };
    });
  };

  const add = (e) => {
    e.preventDefault();
    console.log("Producto a subir:", formData);
  };
console.log("Categorías disponibles:", categories);

  return (
    <div>
        
      <UserHeader />
      
      <div className="flex">
        <div className="hidden sm:block">
          
          <UserSidebar />
        </div>
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg pb-20">
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
                  value={formData.category} // Sincroniza el valor del select con el estado
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-4 py-2"
                >
                  {categories.map((element,i) => (
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
                          src={URL.createObjectURL(image)}
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
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Añadir Producto
            </button>
          </form>
        </div>
      </div>
      
      <UserMobileSidebar/>
      
    </div>
  );
}

export default AddProduct;
