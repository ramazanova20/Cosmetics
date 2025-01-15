import React, { useState, useEffect } from 'react';
import { GiTwirlyFlower } from "react-icons/gi";
import { useDataContext } from "../../context/DataContext";
import { FaPhoneAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import logo from "../../assets/img/logo3.png";

function HeaderTop() {
  const { data, jewelery } = useDataContext();
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

  return (
    <div className="container lg:max-w-[1280px] mx-auto p-3 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="logo">
          <img src={logo} alt="Logo" className='max-w-[220px]'/>
        </div>

        {/* Search Input */}
        <div className="min-w-14">
          <form>
            <div className="flex relative transition-transform duration-200 hover:scale-105">
              <input
                type="text"
                className="border p-1 sm:p-2 rounded-l-md"
                placeholder="Axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="border p-1 sm:p-2 text-red-700 rounded-r-md flex items-center justify-center"
              >
                <GiTwirlyFlower />
              </button>
            </div>
          </form>
        </div>

        {/* Login and Contact Links */}
        <div className="flex sm:flex-col sm:ml-3 md:flex-row">
          <Link to={`/login/`}>
            <div className="flex mr-3 text-center justify-between">
              <div className="p-1 text-[#DE1772] text-xl">
                <CgProfile className='transition-transform duration-300 hover:scale-150' />
              </div>
              <p className="text-xl font-normal">LogIn</p>
            </div>
          </Link>
          <Link to={`/contact/`}>
            <div className="flex text-center justify-between">
              <div className="p-1 text-xl">
                <FaPhoneAlt className='transition-transform duration-300 hover:scale-150' />
              </div>
              <p className="text-xl font-normal">Contacts</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Display Filtered Products */}
      {searchQuery && filteredProducts.length > 0 && (
        <div
          className="absolute z-10 bg-white max-h-[300px] overflow-y-scroll w-full shadow-lg mt-2"
          onMouseDown={(e) => e.preventDefault()} // Click nəticələr divinə fokusun itirilməsinin qarşısını alır
        >
          {filteredProducts.slice(0, 10).map((product, index) => (
            <Link
              key={index}
              to={
                ["women's clothing", "men's clothing", "jewelery", "electronics"].includes(product.category)
                  ? `/aksesuar/${product.id}`
                  : `/cosmetics/${product.id}`
              }
              className="flex gap-3 p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => setSearchQuery("")} // Nəticəni seçdikdən sonra inputu bağlayır
            >
              <div className="w-[40px] h-[40px]">
                <img
                  className="h-full object-contain"
                  src={product.api_featured_image || product.image}
                  alt={product.name || product.title}
                />
              </div>
              <h3 className="items-center">{product.name || product.title}</h3>
            </Link>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {searchQuery && filteredProducts.length === 0 && (
        <p className="absolute z-10 bg-white p-4">No products found.</p>
      )}
    </div>
  );
}

export default HeaderTop;
