// In HeaderTop.js
import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { useDataContext } from "../../context/DataContext";

function HeaderTop() {
  const [searchQuery, setSearchQuery] = useState(""); // Axtarış query-i üçün state

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Input dəyərini yenilə
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // You can now handle search logic or pass the query to a parent component.
    console.log("Search Query:", searchQuery); 
  };

  return (
    <div className='container lg:max-w-[1024px] mx-auto p-3'>
      <div className='flex-col gap-4'>
        <div className='flex flex-col justify-start sm:flex-row sm:justify-between sm:items-center gap-4'>
          <div className='logo'>
            <img src="https://kosmetika.az/logos.png?25" alt="Logo" />
          </div>
          <div className='min-w-14 hidden lg:block'>
            <form onSubmit={handleSearchSubmit}>
              <div className='flex min-w-14'>
                <input
                  type="text"
                  className='border p-1 rounded-l-md'
                  placeholder='Axtar...'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className='p-2 bg-black text-white rounded-r-md flex items-center justify-center'
                >
                  <IoSearch />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
