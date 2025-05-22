import React, { useEffect, useState, useMemo } from "react";
import UserHeader from "../../layout/UserHeader";
import UserSidebar from "../../layout/UserSidebar";
import UserMobileSidebar from "../../layout/UserMobileSidebar";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_all_products } from "../../store/Reducers/productReducer";
import { get_category } from "../../store/Reducers/categoryReducer";

const SearchResults = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const categories = useSelector((state) => state.categories.categories);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [sort, setSort] = useState("relevance"); // "price-asc", "price-desc", "newest"
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParpage] = useState(1000);
  useEffect(() => {
    dispatch(get_all_products());
    const obj = {
      parPage: "",
      page: "",
      searchValue: "",
    };
    dispatch(get_category(obj));
  }, [dispatch, searchValue, currentPage, parPage]);

  const filtered = useMemo(() => {
    let filtered = products.filter(
      (p) =>
        (p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description?.toLowerCase().includes(query.toLowerCase())) &&
        (selectedCategory ? p.category === selectedCategory : true)
    );
    if (sort === "price-asc") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      filtered = filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return filtered;
  }, [products, query, sort, selectedCategory]);

  return (
    <div>
      <UserHeader />
      <div className="flex">
        <div className="w-full sm:w-[85%] md:w-[95%] px-4 py-6 mb-20">
          <h2 className="text-2xl font-bold mb-4">Resultados para "{query}"</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <div className="w-full md:w-auto flex items-center gap-2">
                <label className="font-semibold text-gray-700">
                  Ordenar por:
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl shadow-lg text-gray-700"
                >
                  <option value="relevance">Relevancia</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="newest">Novedad</option>
                </select>
              </div>
              <div className="w-full md:w-auto flex items-center gap-2">
                <label className="font-semibold text-gray-700">
                  Categoría:
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl shadow-lg text-gray-700"
                >
                  <option value="">Todas</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-gray-500 text-sm">
                {filtered.length} producto{filtered.length !== 1 && "s"}{" "}
                encontrado{filtered.length !== 1 && "s"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {filtered.map((product) => (
              <Link
                to={`/user/product-detail/${product._id}`}
                key={product._id}
                className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col w-full"
              >
                {/* Imagen cuadrada y fija */}
                <div className="w-full aspect-square bg-gray-100 flex-shrink-0 overflow-hidden">
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "/images/no-photos.png"
                    }
                    alt={product.name || "Imagen predeterminada"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Zona gris de info con altura fija */}
                <div
                  className="p-3 bg-gray-200 flex flex-col justify-between"
                  style={{ minHeight: 90, height: 90 }}
                >
                  <h3 className="text-base font-semibold truncate">
                    {product.name}
                  </h3>
                  <p className="text-indigo-700 mb-1 text-md font-bold">
                    {product.price} €
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {product.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              No se encontraron productos.
            </div>
          )}
        </div>
      </div>
      <UserMobileSidebar />
    </div>
  );
};

export default SearchResults;
