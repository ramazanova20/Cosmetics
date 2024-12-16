import React, { useState } from "react";
import { useAllDataContext } from "../../context/AllDataContext";
import Heart from "./Heart";

function Main() {
  const { data } = useAllDataContext();
  const [quantities, setQuantities] = useState({});
  const [sortOrder, setSortOrder] = useState("latest");

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
            {sortedData.map((item, i) => (
              <div
                key={i}
                className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative"
              >
                <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
                  <Heart />
                </div>
                <img
                  className="w-full h-[300px]"
                  src={item.api_featured_image}
                  alt={item.name.slice(0, 10)}
                />
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
                    onClick={() =>
                      alert(
                        `Seçtiğiniz ürün: ${quantities[item.id] || 1} adet ${item.name} toplamda ${
                          Math.floor((quantities[item.id] || 1) * item.price)
                        } ₼.`
                      )
                      
                    }
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  >
                    Satın Al
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;