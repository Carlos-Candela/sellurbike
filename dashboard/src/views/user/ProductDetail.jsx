import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserHeader from "../../layout/UserHeader";
import UserMobileSidebar from "../../layout/UserMobileSidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { get_product } from "../../store/Reducers/productReducer";
import { useDispatch } from "react-redux";
import { MdArrowBack } from "react-icons/md";
import UserSidebar from "../../layout/UserSidebar";
import { getCloudinaryUrl } from "../../../utils/utils";
import { FaSpinner } from "react-icons/fa";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { productId } = useParams();
  const product = useSelector((state) => state.product.product);
  const [mainImage, setMainImage] = useState(null);
  const [mainImageLoading, setMainImageLoading] = useState(true);
  const [thumbsLoading, setThumbsLoading] = useState({});

  const handleBuy = () => {
    navigate("/user/checkout", { state: { product } });
  };

  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    setMainImage(null);
  }, [productId]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setMainImage(product.images[0]);
    } else if (product) {
      setMainImage("/images/no-photos.png");
    }
  }, [product]);

  if (!product) {
    return <div className="text-center py-10">Cargando producto...</div>;
  }

  let isOwner = userInfo._id === product.sellerId;

  return (
    <div>
      <UserHeader />

      <div className="flex">
        <div className="hidden sm:block">
          <UserSidebar />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-center py-4 px-4 bg-gray-50">
            {/* Botón para ir atrás */}
            <button
              onClick={() => navigate(-1)}
              className="self-start mb-4 px-4 py-2 bg-gray-400 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition"
            >
              <MdArrowBack />
            </button>
            {/* Imagen principal */}
            <div className="w-full max-w-[600px] aspect-[3/2] bg-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center relative">
              {product.state === "reserved" && (
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs md:text-sm font-bold px-2 py-1 rounded shadow z-10">
                  Reservado
                </div>
              )}
              {mainImageLoading && (
                <span className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100">
                  <FaSpinner className="animate-spin text-3xl text-indigo-500" />
                </span>
              )}
              {mainImage && (
                <img
                  src={
                    mainImage === "/images/no-photos.png"
                      ? mainImage
                      : getCloudinaryUrl(mainImage, {
                          width: 1080,
                          height: 720,
                        })
                  }
                  alt={product.name}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    mainImageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  style={{ objectFit: "cover" }}
                  onLoad={() => setMainImageLoading(false)}
                  onLoadStart={() => setMainImageLoading(true)}
                  loading="lazy"
                />
              )}
            </div>

            <div className="flex gap-2 mb-6">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-16 rounded-lg overflow-hidden border-2 ${
                    mainImage === img ? "border-indigo-500" : "border-gray-200"
                  } relative`}
                >
                  {thumbsLoading[idx] && (
                    <span className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                      <FaSpinner className="animate-spin text-lg text-indigo-500" />
                    </span>
                  )}
                  {img && (
                    <img
                      src={getCloudinaryUrl(img, { width: 120, height: 90 })}
                      alt={`Miniatura ${idx + 1}`}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        thumbsLoading[idx] ? "opacity-0" : "opacity-100"
                      }`}
                      onLoad={() =>
                        setThumbsLoading((prev) => ({ ...prev, [idx]: false }))
                      }
                      onLoadStart={() =>
                        setThumbsLoading((prev) => ({ ...prev, [idx]: true }))
                      }
                      loading="lazy"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Detalles */}
            <div className="w-full max-w-xl bg-white rounded-xl shadow p-6 flex flex-col gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                {product.name}
              </h1>
              {!isOwner && (
                <button
                  onClick={handleBuy}
                  disabled={product.state === "reserved"}
                  className={`px-6 py-2 rounded-full font-semibold transition-all cursor-pointer ${
                    product.state === "reserved"
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-br from-indigo-200 to-indigo-500 text-gray-800 hover:bg-indigo-700"
                  }`}
                >
                  {product.state === "reserved" ? "Reservado" : "Comprar"}
                </button>
              )}
              <h2>Descripción:</h2>
              <p className="text-gray-600">{product.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-indigo-600 font-bold text-xl">
                  {product.price} €
                </span>
              </div>
            </div>
          </div>

          <footer className="bg-gray-100 text-center text-gray-500 py-4 mt-auto">
            © {new Date().getFullYear()} SellURBike. Todos los derechos
            reservados.
          </footer>
        </div>
        <UserMobileSidebar />
      </div>
    </div>
  );
};

export default ProductDetail;
