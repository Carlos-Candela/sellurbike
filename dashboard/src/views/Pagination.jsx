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
  let totalPage = Math.ceil(totalItems / parPage);
  let startPage = pageNumber;
  let dif = totalPage - pageNumber;
  if (dif < showItem) {
    startPage = totalPage - showItem + 1;
  }
  let endPage = startPage < 0 ? showItem : showItem + startPage;

  if (startPage <= 0) {
    startPage = 1;
  }

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li
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

  return (
    <ul className="flex gap-3">
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 cursor-pointer"
        >
          <MdOutlineArrowLeft></MdOutlineArrowLeft>
        </li>
      )}

      {createBtn()}

      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 cursor-pointer"
        >
          <MdOutlineArrowRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
