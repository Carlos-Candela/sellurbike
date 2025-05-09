import React from "react";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import UserHeader from "../layout/UserHeader";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../store/Reducers/categoryReducer";

// Datos de ejemplo de productos
const products = [
  {
    id: 1,
    title: "Bicicleta Trekking",
    price: 120,
    location: "Madrid",
    image: "https://picsum.photos/id/1074/400/300",
  },
  {
    id: 2,
    title: "iPhone 13 usado",
    price: 400,
    location: "Barcelona",
    image: "https://picsum.photos/id/1075/400/300",
  },
  {
    id: 3,
    title: "Sofá de piel",
    price: 250,
    location: "Valencia",
    image: "https://picsum.photos/id/1076/400/300",
  },
  {
    id: 4,
    title: "Portátil HP i7",
    price: 600,
    location: "Sevilla",
    image: "https://picsum.photos/id/1077/400/300",
  },
  {
    id: 5,
    title: "Zapatillas Nike",
    price: 50,
    location: "Málaga",
    image: "https://picsum.photos/id/1078/400/300",
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const { categories, loader, errorMessage } = useSelector(
    (state) => state.categories
  ); // Accede al estado global de categorías

  const [selectedCategory, setSelectedCategory] = useState("");

  // Cargar las categorías desde el estado global al montar el componente
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <UserHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-300 to-indigo-700 text-center py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
          Compra y vende tú bicicleta
        </h2>
        <p className="text-gray-600 mb-6">
          Encuentra tú bicicleta idea sin pagar de más.
        </p>
      </section>

      {/* Categories */}
      <section className="bg-white py-4 px-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat, index) => (
            <button
              key={cat._id || index} // Usa `_id` como clave única, o el índice como respaldo
              className={`px-4 py-2 rounded-full text-sm border ${
                selectedCategory === cat.name
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-white text-gray-600 hover:bg-green-100 border-gray-300"
              }`}
              onClick={() => {
                if (selectedCategory === cat.name) {
                  setSelectedCategory("");
                } else {
                  setSelectedCategory(cat.name);
                }
              }}>
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <div className="flex justify-center">
        <section className="w-[70%] py-10 px-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {product.title}
                </h3>
                <p className="text-indigo-600 font-bold mt-1">
                  {product.price} €
                </p>
                <p className="text-sm text-gray-500">{product.location}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
      {/* Footer */}
      <footer className="bg-gray-100 text-center text-gray-500 py-4 mt-auto">
        © {new Date().getFullYear()} SellURBike. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Home;
