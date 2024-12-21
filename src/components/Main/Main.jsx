import React, {  useEffect, useState, useContext } from "react";
import { useAllDataContext } from "../../context/AllDataContext";
import Heart from "./Heart";
import { Link } from "react-router-dom";
import { BASKET } from "../../context/BasketContext";

function Main({ favorites, setFavorites }) {
  const { data } = useAllDataContext();
  const [quantities, setQuantities] = useState({});
  const [sortOrder, setSortOrder] = useState("latest");
  const { addToBasket } = useContext(BASKET);
  const [slice, setSlice] =useState(15)
  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No items found.</div>;
  }

  const updateQuantity = (id, newQuantity) => {
    setQuantities((quant) => ({
      ...quant,
      [id]: newQuantity,
    }));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.price - b.price;
    } else if (sortOrder === "high-to-low") {
      return b.price - a.price;
    }
    return 0; // Əlavə sıralama növü əlavə etmək mümkündür.
  });
  const addToFavorites = (item) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.find((fav) => fav.id === item.id)) return currentFavorites;
      return [...currentFavorites, item];
    });
  };

  return (
    <div>
      <div className="container lg:max-w-[1024px] mx-auto p-3">
        <div className="my-4">
          <div className="mb-4">
            <label htmlFor="sorting">Sıralama:</label>
            <select
              id="sorting"
              value={sortOrder}
              onChange={handleSortChange}
              className="ml-2 border rounded p-1"
            >
              <option value="latest">Son Məhsullar</option>
              <option value="high-to-low">Bahadan Ucuza</option>
              <option value="low-to-high">Ucuzdan Bahaya</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-6 mx-auto justify-center m-1">
            {sortedData.slice(0, slice).map((item, i) => (
              <div
                key={i}
                className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative"
              >
                <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
                <button onClick={() => addToFavorites(item)}>
                        <Heart />
                      </button>
                </div>
                <Link to={`/cosmetics/${item.id}`}>
                <img
                  className="w-full h-[300px]"
                  src={item.api_featured_image}
                  alt={item.name.slice(0, 10)}
                />
                </Link>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">
                    {item.name.slice(0, 15)}
                  </h2>
                  <h5 className="text-lg font-semibold mb-4">
                    {Math.floor(
                      (quantities[item.id] || 1) * item.price
                    )}₼
                  </h5>
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          Math.max((quantities[item.id] || 1) - 1, 1)
                        )
                      }
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="px-3 py-2">
                      {quantities[item.id] || 1}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          (quantities[item.id] || 1) + 1
                        )
                      }
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => addToBasket( item.id,
                      item.api_featured_image || item.image, 
                      item.name || item.title, 
                      item.price)}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 block"
                  >
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() =>setSlice(slice+15)} className="bg-red">OK</button>
        </div>
      </div>
    </div>
  );
}

export default Main;