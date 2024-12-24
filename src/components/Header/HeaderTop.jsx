import React, { useContext, useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { useDataContext } from "../../context/DataContext";
import { FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

function HeaderTop() {
  const { data,jewelery } = useDataContext(); // Getting the data from context
  const [searchQuery, setSearchQuery] = useState(""); // Declare searchQuery only once
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Handle search logic and filtering
  // useEffect(() => {
  //   if (!data || jewelery || Object.keys(data||jewelery).length === 0) {
  //     setFilteredProducts([]); // If data is empty or not available, set empty array
  //     return;
  //   }

  //   if (!searchQuery.trim()) {
  //     setFilteredProducts([]);  // If search is empty, show all products
  //   } else {
  //     const filteredData = Object.entries(data||jewelery)
  //       .map(([key, value]) => value)
  //       .flat()  // Flatten the array if there are nested arrays in data
  //       .filter(item => item.name || item.title?.toLowerCase().includes(searchQuery.toLowerCase())); // Filter by name

  //     setFilteredProducts(filteredData);  // Set filtered products
  //   }
  // }, [searchQuery, data ||jewelery]);  // Re-run effect when searchQuery or data changes
  useEffect(() => {
    // Check if data or jewelery is available
    const source = data || jewelery;
  
    if (!source || Object.keys(source).length === 0) {
      setFilteredProducts([]); // If source is empty, clear the list
      return;
    }
  
    if (!searchQuery.trim()) {
      setFilteredProducts([]); // If search is empty, clear the list
    } else {
      const filteredData = Object.entries(source)
        .map(([key, value]) => value)
        .flat() // Flatten arrays if nested
        .filter(item =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
  
      setFilteredProducts(filteredData); // Update filtered products
    }
  }, [searchQuery, data, jewelery]); // Add both dependencies separately
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container lg:max-w-[1024px] mx-auto p-3 relative">
      <div className="flex-col gap-4">
        <div className="flex flex-col justify-start sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="logo">
            <img src="https://kosmetika.az/logos.png?25" alt="Logo" />
          </div>
          <div className="min-w-14 hidden lg:block">
            <form >
              <div className="flex min-w-14">
                <input
                  type="text"
                  className="border p-1 rounded-l-md"
                  placeholder="Axtar..."
                  value={searchQuery}  
                  onChange={handleSearch} 
                />
                <button
                  type="submit"
                  className="p-2 bg-black text-white rounded-r-md flex items-center justify-center"
                >
                  <IoSearch />
                </button>
              </div>
            </form>
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
          <form >
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
          </form>
        </div>
      </div>

      {/* Display filtered products */}
      <div className='absolute z-[10] bg-white max-h-[300px] overflow-y-scroll'>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.slice(0, 10).map((product, index) => (
            <div key={index} className='flex gap-3 p-4'>
              <Link
                to={
                  ["women's clothing", "men's clothing", "jewelery", "electronics"].includes(product.category)
                    ? `/aksesuar/${product.id}`
                    : `/cosmetics/${product.id}`
                }
              >
                <div className="w-[40px] h-[40px]">

                  <img
                      className="h-full object-contain"
                      src={product.api_featured_image || product.image} 
                      alt={product.name || product.title} 
                    />
                    </div>
              </Link>
               
              <h3 className='items-center p-3'>{product.name || product.title}</h3>
              {/* Additional product info can be displayed here */}
            </div>
          ))
        ) : (
          searchQuery !== '' ? (
            <p>No products found.</p>
          ) : null
        )}

      </div>
    </div>
  );
}

export default HeaderTop;
