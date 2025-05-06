import React from 'react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import logo from "../assets/sellurbike.png";
import { Link } from 'react-router-dom';
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

  const categories = ["Todo", "Electrónica", "Moda", "Hogar", "Deportes", "Vehículos", "Libros"];


const Home = () => {
      
      const [selectedCategory, setSelectedCategory] = useState("Todo");

    return (
        <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="w-[170px] h-[40px]">
            <img src={logo} alt="SellURBike" className="w-full h-full" />
          </Link>
        <nav className="space-x-4">
          <a href="#" className="text-gray-700 hover:text-green-600">Inicio</a>
          <a href="#" className="text-gray-700 hover:text-green-600">Categorías</a>
          <Link to='/login'>
          <a href="#" className="text-gray-700 hover:text-green-600">Login</a>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-100 to-pulple-700 text-center py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
          Compra y vende cerca de ti
        </h2>
        <p className="text-gray-600 mb-6">
          Encuentra lo que buscas o deshazte de lo que ya no necesitas.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="flex items-center bg-white rounded-full shadow-md p-2 w-full">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="flex-grow px-4 py-2 rounded-l-full focus:outline-none"
            />
            <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-4 px-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm border ${
                selectedCategory === cat
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 hover:bg-green-100 border-gray-300"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-10 px-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
              <p className="text-green-600 font-bold mt-1">{product.price} €</p>
              <p className="text-sm text-gray-500">{product.location}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-gray-500 py-4 mt-auto">
        © {new Date().getFullYear()} Wallaclone. Todos los derechos reservados.
      </footer>
    </div>
    );
};

export default Home;