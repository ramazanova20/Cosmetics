import React, { useContext, useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { useDataContext } from "../../context/DataContext";
import { FaInstagram, FaPhoneAlt } from "react-icons/fa";

function HeaderTop() {
  const {data} = useDataContext(); // Getting the data from context
  const [searchQuery, setSearchQuery] = useState(""); // Declare searchQuery only once
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Handle search logic and filtering
  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      setFilteredProducts([]); // If data is empty or not available, set empty array
      return;
    }

    if (!searchQuery.trim()) {
      setFilteredProducts(Object.values(data));  // If search is empty, show all products
    } else {
      const filteredData = Object.entries(data)
        .map(([key, value]) => value)
        .flat()  // Flatten the array if there are nested arrays in data
        .filter(item => item.name?.toLowerCase().includes(searchQuery.toLowerCase())); // Filter by name

      setFilteredProducts(filteredData);  // Set filtered products
    }
  }, [searchQuery,data]);  // Re-run effect when searchQuery or data changes

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);  // Update search query
  };

  return (
    <div className="container lg:max-w-[1024px] mx-auto p-3">
      <div className="flex-col gap-4">
        <div className="flex flex-col justify-start sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="logo">
            <img src="https://kosmetika.az/logos.png?25" alt="Logo" />
          </div>
          <div className="min-w-14 hidden lg:block">
            {/* <form >
              <div className="flex min-w-14">
                <input
                  type="text"
                  className="border p-1 rounded-l-md"
                  placeholder="Axtar..."
                  value={searchQuery}  // Show the search query value
                  onChange={handleSearch} // Update search query value
                />
                <button
                  type="submit"
                  className="p-2 bg-black text-white rounded-r-md flex items-center justify-center"
                >
                  <IoSearch />
                </button>
              </div>
            </form> */}
          </div>
          <div className="flex">
            <div className="flex mr-3 text-center justify-between">
              <div className="p-1 text-[#DE1772] text-xl">
                <FaInstagram />
              </div>
              <p className="text-xl font-normal">Instagram</p>
            </div>
            <div className="flex text-center justify-between">
              <div className="p-1 text-xl">
                <FaPhoneAlt />
              </div>
              <p className="text-xl font-normal">Bizimlə Əlaqə</p>
            </div>
          </div>
        </div>
        <div className="flex-grow items-center justify-center lg:hidden mt-4">
          {/* <form >
            <div className="flex">
              <input
                type="text"
                className="border p-1 rounded-l-md"
                placeholder="Axtar..."
                value={searchQuery}  // Show the search query value for mobile
                onChange={handleSearch} // Update search query value
              />
              <button
                type="submit"
                className="p-2 bg-black text-white rounded-r-md flex items-center justify-center"
              >
                <IoSearch />
              </button>
            </div>
          </form> */}
        </div>
      </div>

      {/* Display filtered products */}
      
    </div>
  );
}

export default HeaderTop;
