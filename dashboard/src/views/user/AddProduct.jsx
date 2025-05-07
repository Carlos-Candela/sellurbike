import React, { useState } from "react";
import UserHeader from '../../layout/UserHeader'

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: Array.from(e.target.files),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto a subir:", formData);
  };

  return (
    <div>
    <UserHeader/>
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Subir nuevo producto</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
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
          <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
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
            <label htmlFor="price" className="block font-medium text-gray-700 mb-1">
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
            <label htmlFor="category" className="block font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <input
              id="category"
              name="category"
              type="text"
              required
              onChange={handleChange}
              placeholder="Ej: Ropa, Electrónica..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block font-medium text-gray-700 mb-1">
            Ubicación
          </label>
          <input
            id="location"
            name="location"
            type="text"
            required
            onChange={handleChange}
            placeholder="Ciudad o barrio"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="images" className="block font-medium text-gray-700 mb-1">
            Fotos del producto
          </label>
          <input
            id="images"
            name="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-gray-50 file:text-sm file:font-medium hover:file:bg-gray-100"
          />
          {formData.images.length > 0 && (
            <p className="text-sm mt-1 text-gray-500">
              {formData.images.length} imagen(es) seleccionada(s)
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Subir producto
        </button>
      </form>
    </div>
    </div>
  );
}

export default AddProduct;
