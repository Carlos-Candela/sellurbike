import React, { useState } from "react";
import UserHeader from "../../layout/UserHeader";
import Pagination from "../Pagination";
import { FaRegEye } from "react-icons/fa";


const AllOrders = () => {
  const sampleOrders = [
    {
      id: 101,
      product: "Bicicleta de montaña",
      price: "150€",
      image: "https://placehold.co/150x150",
      date: "2025-04-01",
    },
    {
      id: 102,
      product: "iPhone 12",
      price: "500€",
      image: "https://placehold.co/150x150",
      date: "2025-04-03",
    },
    {
      id: 103,
      product: "Mesa de comedor",
      price: "120€",
      image: "https://placehold.co/150x150",
      date: "2025-04-05",
    },
    {
      id: 104,
      product: "Zapatos Nike Air",
      price: "60€",
      image: "https://placehold.co/150x150",
      date: "2025-04-07",
    },
    {
      id: 105,
      product: "Cámara réflex Canon",
      price: "300€",
      image: "https://placehold.co/150x150",
      date: "2025-04-10",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [parPage, setParpage] = useState(5);

  const filteredOrders = sampleOrders.filter((order) =>
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (id) => {
    alert(`Ver detalles del pedido ID: ${id}`);
  };

  return (
    <div>
      <UserHeader />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Pedidos realizados</h2>
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
            placeholder="Buscar pedidos..."
            className="w-full p-2 border border-gray-300 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-6 items-center">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition w-full flex"
            >
              <div className="w-40 h-40 flex-shrink-0">
                <img
                  src={order.image}
                  alt={order.product}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex justify-between flex-grow">
                <div className=" w-[90%]">
                  <h3 className="text-lg font-semibold">{order.product}</h3>
                  <p className="text-gray-700">{order.price}</p>
                  <p className="text-sm text-gray-500">Fecha: {order.date}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => handleViewDetails(order.id)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-full text-sm hover:bg-indigo-600"
                  >
                    <FaRegEye/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full justify-end flex mt-4">
          {sampleOrders.length > parPage && (
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItems={sampleOrders.length}
              parPage={parPage}
              showItem={3}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;

