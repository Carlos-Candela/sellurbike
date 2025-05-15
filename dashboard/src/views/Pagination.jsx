import React from "react";
import { MdOutlineArrowLeft } from "react-icons/md";
import { MdOutlineArrowRight } from "react-icons/md";

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItems,
  parPage,
  showItem,
}) => {
  const totalPage = Math.ceil(totalItems / parPage);

  // Asegúrate de que `showItem` no sea mayor que `totalPage`
  const visiblePages = Math.min(showItem, totalPage);

  // Calcula el rango de páginas visibles
  let startPage = Math.max(1, pageNumber - Math.floor(visiblePages / 2));
  let endPage = Math.min(totalPage, startPage + visiblePages - 1);

  // Ajusta `startPage` si `endPage` está cerca del final
  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li
          key={i}
          onClick={() => setPageNumber(i)}
          className={`${
            pageNumber === i
              ? "bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white cursor-pointer"
              : "bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]"
          } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
        >
          {i}
        </li>
      );
    }
    return btns;
  };

  if (totalPage <= 1) return null; // No mostrar paginación si solo hay una página

  return (
    <ul className="flex gap-3">
      <li
        onClick={() => setPageNumber(pageNumber - 1)}
        className={`w-[33px] h-[33px] rounded-full flex justify-center items-center ${
          pageNumber === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-slate-300 cursor-pointer"
        }`}
        disabled={pageNumber === 1}
      >
        <MdOutlineArrowLeft />
      </li>

      {createBtn()}

      <li
        onClick={() => setPageNumber(pageNumber + 1)}
        className={`w-[33px] h-[33px] rounded-full flex justify-center items-center ${
          pageNumber === totalPage
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-slate-300 cursor-pointer"
        }`}
        disabled={pageNumber === totalPage}
      >
        <MdOutlineArrowRight />
      </li>
    </ul>
  );
};

export default Pagination;
