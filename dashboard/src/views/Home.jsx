import React, { CSSProperties, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserHeader from "../layout/UserHeader";
import UserMobileSidebar from "../layout/UserMobileSidebar";
import { GridLoader } from "react-spinners";
import {
  get_all_products,
  messageClear,
} from "../store/Reducers/productReducer";
import toast from "react-hot-toast";
import { useMemo } from "react";
import { get_category } from '../store/Reducers/categoryReducer';

const PRODUCTS_PER_PAGE = 12;

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const categories = useSelector((state) => state.categories.categories);
  const { products, successMessage, errorMessage, loader } = useSelector(
    (state) => state.product
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParpage] = useState(1000);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState([]);

  // Redirección según autenticación y rol
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else if (userInfo) {
      if (userInfo.role === "admin") {
        navigate("/admin/dashboard");
      } else if (userInfo.role === "seller") {
        navigate("/");
      }
    }
  }, [userInfo, navigate]);

  // Filtrar productos por categoría
  const filteredProducts = useMemo(() => {
    return selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;
  }, [products, selectedCategory]);
  // Actualizar productos visibles al cambiar filtro o página
  useEffect(() => {
    setVisibleProducts(filteredProducts.slice(0, page * PRODUCTS_PER_PAGE));
  }, [filteredProducts, page]);

  // Scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        visibleProducts.length < filteredProducts.length
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleProducts, filteredProducts.length]);

  // Resetear página al cambiar de categoría
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    dispatch(get_all_products());
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  useEffect(() => {
    const obj = {
      parPage: "",
      page: "",
      searchValue: "",
    };
    dispatch(get_category(obj));
  }, [searchValue, currentPage, parPage]);
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <UserHeader />

      {/* Hero Section */}
      <section className="relative text-center py-16 px-4 overflow-hidden">
        {/* Imagen de fondo */}
        <img
          src="/images/hero.jpg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        />
        {/* Contenido por encima */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-black transition-all">
            Compra y vende tú bicicleta
          </h2>
          <p className="text-gray-900 mb-6">
            Encuentra tú bicicleta idea sin pagar de más.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-4 px-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat, index) => (
            <button
              key={cat._id || index}
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
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-gray-700 text-center transition-all duration-300">
        Productos recientes
      </h2>
      <div className="flex justify-center ">
        <section className="w-full py-10 px-2 grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-center">
          {visibleProducts.map((product) => (
            <Link
              to={`/user/product-detail/${product._id}`}
              key={product._id}
              className="bg-white w-[90%] rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <div className="w-full aspect-[4/3] bg-gray-100 min-h-0 flex-shrink-0 overflow-hidden">
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : "images/no-photos.png"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 p-3 flex flex-col flex-1 justify-between min-h-[80px]">
                <h3 className="font-semibold text-base md:text-lg lg:text-2xl text-gray-800 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-indigo-600 font-bold mt-1 text-sm md:text-base lg:text-xl">
                  {product.price} €
                </p>
                <p className="text-xs text-gray-500 mt-1">{product.location}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
      {/* Loader */}
      {visibleProducts.length < filteredProducts.length && (
        <GridLoader
          color={"#9b9b9b"}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-gray-500 py-4 mt-auto">
        © {new Date().getFullYear()} SellURBike. Todos los derechos reservados.
      </footer>
      <UserMobileSidebar />
    </div>
  );
};

export default Home;
