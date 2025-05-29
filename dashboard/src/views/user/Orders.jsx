import React, { useState, useEffect } from "react";
import UserHeader from "../../layout/UserHeader";
import Pagination from "../Pagination";
import { FaRegEye } from "react-icons/fa";
import UserSidebar from "../../layout/UserSidebar";
import UserMobileSidebar from "../../layout/UserMobileSidebar";
import { useDispatch, useSelector } from "react-redux";
import { get_orders_user } from "../../store/Reducers/orderReducer";

const AllOrders = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userInfo._id);

  useEffect(() => {
    dispatch(get_orders_user(userId));
  }, [dispatch, userId]);

  const orders = useSelector((state) => state.order.orders);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [parPage, setParpage] = useState(5);

  const filteredOrders = orders.filter((order) =>
    order.productId.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (id) => {
    alert(`Ver detalles del pedido ID: ${id}`);
  };

  return (
    <div>
      <UserHeader />
      <div className="flex">
        {/* Sidebar visible en pantallas grandes */}
        <div className="hidden sm:block">
          <UserSidebar />
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col w-full px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">Pedidos realizados</h2>
          <div className="flex justify-center items-center gap-2 mb-6">
            <select
              onChange={(e) => setParpage(parseInt(e.target.value))}
              className="px-4 py-2 border-1 hover:shadow-gray-800/50 outline-none text-[#d0d2d6] rounded-xl shadow-lg"
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
            {filteredOrders.length === 0 ? (
              <div className="text-center text-gray-600 text-lg mt-10">
                No has comprado ningún producto todavía.
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition w-full flex"
                >
                  <div className="w-40 h-40 flex-shrink-0">
                    <img
                      src={order.productId.images[0]}
                      alt={order.productId.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex justify-between flex-grow">
                    <div className="w-[90%]">
                      <h3 className="text-lg font-semibold">
                        {order.productId.name}
                      </h3>
                      <p className="text-indigo-700 font-bold">
                        {order.productId.price} €
                      </p>
                      <p className="text-sm text-gray-500 font-bold">
                        Fecha:{" "}
                        {new Date(order.purchaseDate).toLocaleString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="mt-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                            order.role === "buyer"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {order.role === "buyer" ? "Comprado" : "Vendido"}
                        </span>
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => handleViewDetails(order._id)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-full text-sm hover:bg-indigo-600"
                      >
                        <FaRegEye />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-full justify-end flex mt-4">
            {orders.length > parPage && (
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItems={orders.length}
                parPage={parPage}
                showItem={3}
              />
            )}
          </div>
        </div>

        {/* Sidebar móvil */}
        <UserMobileSidebar />
      </div>
    </div>
  );
};

export default AllOrders;
