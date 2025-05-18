import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserHeader from "../../layout/UserHeader";
import UserMobileSidebar from "../../layout/UserMobileSidebar";
import { Link, useParams , useNavigate} from "react-router-dom";
import { get_product } from "../../store/Reducers/productReducer";
import { useDispatch } from "react-redux";
import { MdArrowBack } from "react-icons/md";
import UserSidebar from "../../layout/UserSidebar";


const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { productId } = useParams();
  const product = useSelector((state) => state.product.product);
  const [mainImage, setMainImage] = useState(null);

  
    
  useEffect(() => {
    dispatch(get_product(productId));
  }, [productId, dispatch]);

 useEffect(() => {
  setMainImage(null);
}, [productId]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setMainImage(product.images[0]);
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
        <div
  className="w-full max-w-[600px] aspect-[3/2] bg-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center"
>
  <img
    src={mainImage}
    alt={product.name}
    className="w-full h-full object-cover"
    style={{ objectFit: 'cover' }}
  />
</div>

        {/* Miniaturas */}
        <div className="flex gap-2 mb-6">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`w-20 h-16 rounded-lg overflow-hidden border-2 ${
                mainImage === img ? "border-indigo-500" : "border-gray-200"
              }`}
            >
              <img
                src={img}
                alt={`Miniatura ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Detalles */}
        <div className="w-full max-w-xl bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            {product.name}
          </h1>
          <h2>Descripción:</h2>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-indigo-600 font-bold text-xl">
              {product.price} €
            </span>
            {!isOwner && (
              <button className="bg-gradient-to-br from-indigo-200 to-indigo-500 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-all cursor-pointer">
                Comprar
              </button>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gray-100 text-center text-gray-500 py-4 mt-auto">
        © {new Date().getFullYear()} SellURBike. Todos los derechos reservados.
      </footer>
      </div>
      <UserMobileSidebar />
    </div>
    </div>
  );
};

export default ProductDetail;
