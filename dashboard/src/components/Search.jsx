import React from 'react';

const Search = ({setParpage, setSearchValue, searchValue}) => {

    return (
        <div className="flex justify-between items-center">
            <select
              onChange={(e) => setParpage(parseInt(e.target.value))}
              className="px-4 mr-4 py-2 border-1 hover:shadow-gray-800/50 outline-none bg-[#6a5fdf] text-[#d0d2d6] rounded-md shadow-lg"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>

            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Buscar..."
              className="px-4 py-2 border-1 hover:shadow-gray-800/50 outline-none bg-[#6a5fdf] text-[#d0d2d6] rounded-md shadow-lg"
            ></input>
          </div>
    );
};

export default Search;