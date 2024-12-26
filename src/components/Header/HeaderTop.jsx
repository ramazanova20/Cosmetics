import React, { useContext, useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { useDataContext } from "../../context/DataContext";
import { FaPhoneAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

function HeaderTop() {
  const { data,jewelery } = useDataContext(); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    
    const source = data || jewelery;
  
    if (!source || Object.keys(source).length === 0) {
      setFilteredProducts([]); 
      return;
    }
  
    if (!searchQuery.trim()) {
      setFilteredProducts([]); 
    } else {
      const filteredData = Object.entries(source)
        .map(([key, value]) => value)
        .flat() 
        .filter(item =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
  
      setFilteredProducts(filteredData); 
    }
  }, [searchQuery, data, jewelery]); 
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container lg:max-w-[1280px] mx-auto p-3 relative">
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
            <Link to={`/login/`}>
            <div className="flex mr-3 text-center justify-between">
              <div className="p-1 text-[#DE1772] text-xl">
                <CgProfile />
              </div>
              <p className="text-xl font-normal">LogIn</p>
            </div>
            </Link>
            <Link to={`/contact/`}>
            <div className="flex text-center justify-between">
              <div className="p-1 text-xl">
                <FaPhoneAlt />
              </div>
              <p className="text-xl font-normal">Bizimlə Əlaqə</p>
            </div>
            </Link>
          </div>
        </div>
        <div className="flex-grow items-center justify-center lg:hidden mt-4">
          <form >
            <div className="flex">
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
