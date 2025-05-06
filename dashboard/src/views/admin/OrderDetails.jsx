import React from "react";

const OrderDetails = () => {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-[#d0d2d6] text-lg font-bold">
            Detalles del pedido
          </h2>
          <select className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#474748] text-[#d0d2d6] rounded-md shadow-lg border-slate-700 ">
            <option value="pendiente">pendiente</option>
            <option value="procesando">procesando</option>
            <option value="depositado">depositado</option>
            <option value="completado">completado</option>
            <option value="cancelado">cancelado</option>
          </select>
        </div>
        <div className="p-4">
          <div className="flex pb-3 gap-2 text-lg text-[#d0d2d6] ">
            <span>Id pedido:</span>
            <span className="text-[#d0d2d6]">#653623</span>
          </div>
          <div className="flex flex-wrap">
            <div className="w-[30%]">
              <div className="pr-3 pb-3 text-[#d0d2d6] text-lg ">
                Detalles del pedido
              </div>
              <div className="flex flex-col gap-2 pb-3 text-[#d0d2d6] text-sm">
                <span>Nombre: Juan Perez</span>
                <span>Telefono: 666666666</span>
                <span>Email: kakijwqpef@gmail.com</span>
              </div>
              <div className="flex pb-3 justify-start items-center gap-3">
                <h2>Estado del Pago</h2>
                <span className="text-[#d0d2d6]">Pendiente</span>
              </div>
              <span className="text-[#d0d2d6]">Price: 3.000€</span>

              <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md p-4">
                <div className="text-[#d0d2d6] ">
                  <div className="flex gap-3 text-md">
                    <img
                      className="w-[50px] h-[50px]"
                      src="http://localhost:5173/images/category/3.jpg"
                      alt=""
                    />
                    <div>
                      <h2>Product name</h2>
                      <p>
                        <span>Marca: </span>
                        <span>Cannondale</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-md p-4">
                <div className="text-[#d0d2d6] ">
                  <div className="flex gap-3 text-md">
                    <img
                      className="w-[50px] h-[50px]"
                      src="http://localhost:5173/images/category/3.jpg"
                      alt=""
                    />
                    <div>
                      <h2>Product name</h2>
                      <p>
                        <span>Marca: </span>
                        <span>Cannondale</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[70%] pl-3">
              <div className="pl-3 bg-[#9b92da] rounded-md p-4">
                <div className="flex flex-col  rounded-md p-2">
                  <div className="flex justify-start items-center gap-3">
                    <h2 className="text-[#d0d2d6]">Detalles del pedido:</h2>
                    <span className="text-[#d0d2d6]">Pendiente</span>
                  </div>
                  <div className="text-[#d0d2d6] mt-2">
                    <div className="flex gap-3 text-md">
                      <img
                        className="w-[50px] h-[50px]"
                        src="http://localhost:5173/images/category/3.jpg"
                        alt=""
                      />
                      <div>
                        <h2>Product name</h2>
                        <p>
                          <span>Marca: </span>
                          <span>Cannondale</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  rounded-md p-2">
                  <div className="flex justify-start items-center gap-3">
                    <h2 className="text-[#d0d2d6]">Detalles del pedido:</h2>
                    <span className="text-[#d0d2d6]">Pendiente</span>
                  </div>
                  <div className="text-[#d0d2d6] mt-2">
                    <div className="flex gap-3 text-md">
                      <img
                        className="w-[50px] h-[50px]"
                        src="http://localhost:5173/images/category/3.jpg"
                        alt=""
                      />
                      <div>
                        <h2>Product name</h2>
                        <p>
                          <span>Marca: </span>
                          <span>Cannondale</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
