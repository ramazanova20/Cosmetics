// In HeaderTop.js
import React, { useContext, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { DATA, useDataContext } from "../../context/DataContext";
import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

function HeaderTop() {
  // const [searchQuery, setSearchQuery] = useState(""); // Axtarış query-i üçün state
  const { setSearchQuery } = useDataContext();
  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value); // Input dəyərini yenilə
  // };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query in context
  };




  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // The search query is now updated in context, so you can use it in your context's data filtering.
    console.log("Search Query:", e.target.value); 
  };
  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   // You can now handle search logic or pass the query to a parent component.
  //   console.log("Search Query:", searchQuery); 
  // };

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
                  onChange={handleSearchChange}  // Bind to handleSearchChange for updating context state
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
          <div className='flex'>
                        <div className='flex mr-3 text-center justify-between'>
                            <div className='p-1 text-[#DE1772] text-xl'><FaInstagram/></div>
                            <p className='text-xl font-normal'>Instagram</p>
                        </div>
                        <div className='flex text-center justify-between'>
                            <div className='p-1 text-xl'><FaPhoneAlt/></div>
                            <p className='text-xl font-normal'>Bizimlə Əlaqə</p>
                        </div>
                    </div>
        </div>
        <div className=' flex-grow items-center justify-center lg:hidden mt-4'>
                    <form action="">
                        <div className='flex'>
                        <input
                  type="text"
                  className='border p-1 rounded-l-md'
                  placeholder='Axtar...'
                  onChange={handleSearchChange}  // Bind to handleSearchChange for updating context state
                />
                            <div className='p-2 bg-black text-white  rounded-r-md flex items-center justify-center'><IoSearch /></div>
                        </div>
                    </form>
                </div>
      </div>
    </div>
  );
}

export default HeaderTop;
