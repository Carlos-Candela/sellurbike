import React, { useState} from "react";
import UserHeader from "../../layout/UserHeader";
import Pagination from "../Pagination";
import UserSidebar from "../../layout/UserSidebar";

const AllProducts = () => {
    const sampleProducts = [
        {
          id: 1,
          name: "Bicicleta de montaña",
          price: "150€",
          image: "https://placehold.co/150x150",
        },
        {
          id: 2,
          name: "Silla de oficina ergonómica",
          price: "70€",
          image: "https://placehold.co/150x150",
        },
        {
          id: 3,
          name: "iPhone 12",
          price: "500€",
          image: "https://placehold.co/150x150",
        },
        {
          id: 4,
          name: "Mesa de comedor",
          price: "120€",
          image: "https://placehold.co/150x150",
        },
        {
          id: 5,
          name: "Zapatos Nike Air",
          price: "60€",
          image: "https://placehold.co/150x150",
        },
        {
          id: 6,
          name: "Cámara réflex Canon",
          price: "300€",
          image: "https://placehold.co/150x150",
        },
      ];
  const [currentePage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [parPage, setParpage] = useState(5);

  const filteredProducts = sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <UserHeader />
      <div className="flex">
        <div>
          <UserSidebar />
        </div>
        <div className="max-w-5xl mx-auto px-4 py-6">
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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition w-[70%] sm:w-[85%] md:w-[95%]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700 mb-4">{product.price}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 "
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full justify-end flex mt-4">
            {sampleProducts.length > parPage && (
              <Pagination
                pageNumber={currentePage}
                setPageNumber={setCurrentPage}
                totalItems={sampleProducts.length}
                parPage={parPage}
                showItem={3}
              />
            )}
          </div>
    </div>
      </div>
    </div>
  );
};







export default AllProducts;
