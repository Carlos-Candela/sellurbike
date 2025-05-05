import React from "react";

const SellerDetails = () => {
  return (
    <div className="px-2 lg-px-7 pt-5">
      <h1 className="text-xl font-bold mb-4">Detalles Usuario</h1>
      <div className="w-full bg-[#6a5fdf] rounded-md">
        <div className="w-full flex flex-wrap text-[#d0d2d6]">
          <div className="w-3/12 flex justify-center items-center py-3">
            <div>
              <img
                className="pl-2 w-full h-[230px]"
                src="http://localhost:5173/images/admin.jpg"
                alt="Profile"
              />
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Info</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#8e92f8] rounded-md">
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Nombre:</span>
                  <span className="text-[#d0d2d6]">John Doe</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Email:</span>
                  <span className="text-[#d0d2d6]">john@gmaio.com</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Rol:</span>
                  <span className="text-[#d0d2d6]">Vendedor</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Estado:</span>
                  <span className="text-[#d0d2d6]">Activo</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Estado del pago:</span>
                  <span className="text-[#d0d2d6]">Activo</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Dirección</h2>
              </div>
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#8e92f8] rounded-md">
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Nombre de la tienda:</span>
                  <span className="text-[#d0d2d6]">John Doe</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Pais:</span>
                  <span className="text-[#d0d2d6]">España</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Provincia:</span>
                  <span className="text-[#d0d2d6]">Alicante</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Calle:</span>
                  <span className="text-[#d0d2d6]">C/.kjañdkjfñakf</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Codigo postal:</span>
                  <span className="text-[#d0d2d6]">03640</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form>
            <div className="flex gap-4 py-3 pl-4">
              <select
                className="px-4 py-2 border-1 hover:shadow-gray-800/50 outline-none bg-[#6a5fdf] text-[#d0d2d6] rounded-md shadow-lg"
                name=""
                id=""
              >
                <option value="">---Seleccionar Estado---</option>
                <option value="">Activo</option>
                <option value="">Inactivo</option>
              </select>
              <button
                onClick=""
                className="bg-red-500 shadow-lg hover:shadow-red-500/50 px-4 py-2 cursor-pointer text-white rounded-sm"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
