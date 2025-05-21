import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get_seller, messageClear, seller_status_update } from "../../store/Reducers/sellerReducer";
import toast from "react-hot-toast";

const SellerDetails = () => {
  const dispatch = useDispatch();
  const { seller, successMessage, errorMessage } = useSelector(
    (state) => state.seller
  );
  const { sellerId } = useParams();

  const statusMap = {
    pending: "Pendiente",
    active: "Activo",
    deactive: "Inactivo",
  };

  const statusPayment = {
    active: "Activo",
    inactive: "Inactivo",
  };

  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId]);

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

  useEffect(()=>{
    if (seller){
      setStatus(seller.status)
    }
  },[seller])

  const [status, setStatus] = useState("");

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      seller_status_update({
        status,
        sellerId,
      })
    );
  };
  return (
    <div className="px-2 lg:px-7 pt-5 pb-4 ">
      <h1 className="text-xl font-bold mb-4">Detalles Usuario</h1>
      <div className="w-full bg-[#6a5fdf] rounded-md mb-4">
        <div className="w-full flex flex-col md:flex-row flex-wrap text-[#d0d2d6]">
          <div className="w-full md:w-3/12 flex justify-center items-center py-3">
            <div className="w-32 h-32 md:w-full md:h-[230px] flex justify-center items-center mx-auto">
              <img
                className="w-full h-full ml-4 object-contain rounded-md bg-white"
                src={seller && seller.image ? seller.image : "/images/user.png"}
                alt="Profile"
              />
            </div>
          </div>
          <div className="w-full md:w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Info</h2>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-[#8e92f8] rounded-md text-sm">
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Nombre:</span>
                  <span className="text-[#d0d2d6]">{seller.name}</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Email:</span>
                  <span className="text-[#d0d2d6]">{seller.email}</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Rol:</span>
                  <span className="text-[#d0d2d6]">{seller.role}</span>
                </div>
                <div className="flex gap-2 font-bold text-black items-center">
                  <span className="font-bold">Estado:</span>
                  <span
                    className={
                      "text-[#d0d2d6] px-2 py-1 rounded-md text-xs font-semibold " +
                      (seller.status === "active"
                        ? "bg-green-500"
                        : seller.status === "pending"
                        ? "bg-yellow-400 text-black"
                        : seller.status === "deactive"
                        ? "bg-red-500"
                        : "bg-gray-400")
                    }
                  >
                    {statusMap[seller.status] || seller.status}
                  </span>
                </div>
                <div className="flex gap-2 font-bold text-black items-center">
                  <span className="font-bold">Estado de pago:</span>
                  <span
                    className={
                      "text-[#d0d2d6] px-2 py-1 rounded-md text-xs font-semibold " +
                      (seller.payment === "active"
                        ? "bg-green-500"
                        : seller.payment === "inactive"
                        ? "bg-red-500"
                        : "bg-gray-400")
                    }
                  >
                    {statusPayment[seller.payment] || seller.payment}
                  </span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Miembro desde:</span>
                  <span className="text-[#d0d2d6]">
                    {seller.createdAt &&
                      new Date(seller.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Dirección</h2>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-[#8e92f8] rounded-md text-sm">
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Pais:</span>
                  <span className="text-[#d0d2d6]">España</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Provincia:</span>
                  <span className="text-[#d0d2d6]">{seller.province}</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Población:</span>
                  <span className="text-[#d0d2d6]">{seller.city}</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Calle:</span>
                  <span className="text-[#d0d2d6]">{seller.address}</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Codigo postal:</span>
                  <span className="text-[#d0d2d6]">{seller.postalCode}</span>
                </div>
                <div className="flex gap-2 font-bold text-black">
                  <span className="font-bold">Teléfono:</span>
                  <span className="text-[#d0d2d6]">{seller.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={submit}>
            <div className="flex flex-col sm:flex-row gap-4 py-3 pl-4">
              <select
                className="px-4 py-2 mr-4 border-1 hover:shadow-gray-800/50 outline-none bg-[#6a5fdf] text-[#d0d2d6] rounded-md shadow-lg"
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">---Seleccionar Estado---</option>
                <option value="active">Activo</option>
                <option value="deactive">Inactivo</option>
              </select>
              <button
                type="submit"
                className="bg-red-500 shadow-lg mr-4  hover:shadow-red-500/50 px-4 py-2 cursor-pointer text-white rounded-sm"
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
