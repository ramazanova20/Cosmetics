// src/components/Main/JewelryItem.jsx
import React, { useContext, useState, useEffect } from "react";
import { DATA } from "../../context/DataContext";
import Heart from './Heart'; 

function JeweleryItem() {
  const { jewelery } = useContext(DATA);
  const [showProductList, setShowProductList] = useState([]);
  const [sorting, setSorting] = useState("latest");
  const [quant, setQuant] = useState(1);

  useEffect(() => {
    if (jewelery) {
      setShowProductList(jewelery); 
    }
  }, [jewelery]);

  useEffect(() => {
    if (showProductList.length > 0) {
      handleSortingChange(sorting); 
    }
  }, [sorting, jewelery]);

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);

    let sortedProducts = [...jewelery];

    if (newSorting === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price); 
    } else if (newSorting === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      sortedProducts = jewelery;
    }

    setShowProductList(sortedProducts); 
  };

  if (!jewelery) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
    <div>
        Sıralama:
        <select
          name="sorting"
          id="sorting"
          onChange={(e) => handleSortingChange(e.target.value)}
          value={sorting}
        >
          <option value="latest">Son Məhsullar</option>
          <option value="high-to-low">Bahadan Ucuza</option>
          <option value="low-to-high">Ucuzdan Bahaya</option>
        </select>
      </div>
    <div className="flex flex-wrap gap-6 mx-auto justify-center m-1">
      
      
      {showProductList.map((item, i) => (
        <div key={i} className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative">
          <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
            <Heart />
          </div>
          <img className="w-full h-[300px]" src={item.image} alt={item.title} />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">{item.title.slice(0, 17)}</h2>
            <h5 className="text-lg font-semibold mb-4">{quant * item.price}₼</h5>
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setQuant(quant > 1 ? quant - 1 : quant)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="px-3 py-2">{quant}</span>
              <button
                onClick={() => setQuant(quant + 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
            <button
              onClick={() => alert(`You selected ${quant} ${item.title}(s) for ${quant * item.price} ₼.`)}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default JeweleryItem;
