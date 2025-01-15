import React, {  useEffect, useState, useContext } from "react";
import { useAllDataContext } from "../../context/AllDataContext";
import Heart from "./Heart";
import { Link } from "react-router-dom";
import { BASKET } from "../../context/BasketContext";
import Loading from "./Loading";
import { SlBasket } from "react-icons/sl";


function Main({ favorites, setFavorites }) {
  const { data } = useAllDataContext();
  const [sortOrder, setSortOrder] = useState("latest");
  const { addToBasket } = useContext(BASKET);
  const [slice, setSlice] =useState(15)
  const [showCarusell, setShowCarusell] = useState(true); 

  if (!data) {
    return <div className="container lg:max-w-[1280px] mx-auto p-3">
      <Loading/>
    </div>;
  }

  if (data.length === 0) {
    return <div>No items found.</div>;
  }


  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    } else if (sortOrder === "high-to-low") {
      return b.price - a.price;
    }
    return 0; 
  });
  const addToFavorites = (item) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.find((fav) => fav.id === item.id)) return currentFavorites;
      return [...currentFavorites, item];
    });
  };

  return (
    <div>
       {showCarusell ? (
        <div className="container lg:max-w-[1280px] mx-auto p-3">
          <div className="relative flex justify-center items-center w-full h-96">
    <img
      className="object-cover w-full h-full"
      src="https://images.unsplash.com/photo-1595051665600-afd01ea7c446?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Cosmetics"
    />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-5 py-3 rounded-md text-center">
      <button
        onClick={() => setShowCarusell(false)}
        className="text-2xl font-semibold tracking-wide hover:opacity-80 transition-opacity"
      >
        Cosmetics
      </button>
                        </div>
                      </div>
          {/* <button
            onClick={() => setShowCarusell(false)} // Carusell-i bağlamaq üçün
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
          >
            Məhsulları Gör
          </button> */}
        </div>
      ) : (
      <div className="container lg:max-w-[1280px] mx-auto p-3">
        <div className="my-4 ">
        <h1 className='text-2xl font-bold mb-4 uppercase italic'>Kosmetik Mehsullar</h1>
          <div className="mb-4">
            <label htmlFor="sorting">Sıralama:</label>
            <select
              id="sorting"
              value={sortOrder}
              onChange={handleSortChange}
              className="ml-2 border rounded p-1">
              <option value="latest">Son Məhsullar</option>
              <option value="high-to-low">Bahadan Ucuza</option>
              <option value="low-to-high">Ucuzdan Bahaya</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-10 mx-auto justify-center m-1">
  {sortedData.slice(0, slice).map((item, i) => (
    <div
      key={i}
      className="w-[200px] rounded overflow-hidden shadow-lg bg-white relative transition-transform duration-200 hover:scale-105"
    >
      <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
        <button onClick={() => addToFavorites(item)}>
          <Heart />
        </button>
      </div>
      <Link to={`/cosmetics/${item.id}`} className="w-full ">
        <img
          className="w-full h-[290px] object-contain"
          src={item.api_featured_image}
          alt={item.name}
        />
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate">
          {item.name.slice(0, 15) + (item.name.length > 15 ? "..." : "")}
        </h2>
        <h5 className="text-lg font-semibold mb-4 flex justify-center">
          {item.price}₼
        </h5>
        <button
          onClick={() =>
            addToBasket(
              item.id,
              item.api_featured_image || item.image,
              item.name || item.title,
              item.price
            )
          }
          className="m-auto text-blue-500 py-2 rounded block">
                    <div className=" font-bold rounded transition-transform duration-300 hover:animate-bounce">
                     <SlBasket className="text-2xl" />
                     </div>
        </button>
      </div>
    </div>
   ))}
   </div>
   <div className="max-w-[400px] mx-auto items-center rounded overflow-hidden shadow-lg">
     <button
       onClick={() => setSlice(slice + 15)}
       className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 block"
     >
       Daha Çox
     </button>
   </div>
 </div>
</div>
)}
</div>
  );
}

export default Main;