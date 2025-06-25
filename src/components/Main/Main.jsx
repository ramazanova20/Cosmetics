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
      <div className="container lg:max-w-[1280px] mx-auto p-3">
        <div className="my-4 ">
        <h1 className='text-2xl font-bold mb-4 uppercase italic'>Cosmetics Products</h1>
          <div className="mb-4">
            <label htmlFor="sorting">Sorting:</label>
            <select
              id="sorting"
              value={sortOrder}
              onChange={handleSortChange}
              className="ml-2 border rounded p-1">
              <option value="latest">Last Products</option>
              <option value="high-to-low">From Expensive to Cheap</option>
              <option value="low-to-high">From Cheap to Expensive</option>
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
                    <h2 className="text-lg font-semibold mb-2 truncate text-center">
                      {item.name.slice(0, 15) + (item.name.length > 15 ? "..." : "")}
                    </h2>
                    <h5 className="text-lg font-semibold mb-4 flex justify-center">
                      {item.price}$
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
                <div className="max-w-[400px] mx-auto items-center rounded overflow-hidden shadow-lg mt-4">
                  <button
                    onClick={() => setSlice(slice + 15)}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 block"
                  >
                    More
                  </button>
                </div>
              </div>
</div>
</div>
  );
}

export default Main;