import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDataContext } from '../../context/DataContext';
import { useAllDataContext } from '../../context/AllDataContext';
import Heart from './Heart';

function Item() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tip = queryParams.get('tip');

  const { data } = useAllDataContext();
  const { lipstick, foundation, eyeliner } = useDataContext();
  const [filteredData, setFilteredData] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [sorting, setSorting] = useState("latest");

  useEffect(() => {
    let data;
    if (tip === 'eyeliner') {
      data = eyeliner;
    } else if (tip === 'lipstick') {
      data = lipstick;
    } else if (tip === 'foundation') {
      data = foundation;
    }

    // Only update filteredData if there's a change
    if (data && JSON.stringify(filteredData) !== JSON.stringify(data)) {
      setFilteredData(data);
    }
  }, [tip, lipstick, foundation, eyeliner]);

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);
  };

  useEffect(() => {
    if (!filteredData) return;

    let sortedProducts = [...filteredData];
    if (sorting === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sorting === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }

    setFilteredData(sortedProducts); // Update sorted data
  }, [sorting, filteredData]);

  const updateQuantity = (id, newQuantity) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }));
  };

  if (!filteredData) {
    return <div>Loading...</div>;
  }

  if (filteredData.length === 0) {
    return <div>{tip} not found.</div>;
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
      <div className="flex flex-wrap gap-10 mx-auto justify-center m-1">
        {filteredData.map((item, i) => (
          <div
            key={i}
            className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative flex flex-col "
          >
            <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
              <Heart />
            </div>
            <div className='w-full h-[280px]'>
              <img
                className='h-full object-contain'
                src={item.api_featured_image}
                alt={item.name}
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2  whitespace-nowrap">
                {item.name.slice(0, 15)}
              </h2>
              <h5 className="text-lg font-semibold mb-4">
                {Math.floor((quantities[item.id] || 1) * item.price)}₼
              </h5>
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max((quantities[item.id] || 1) - 1, 1))
                  }
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="px-3 py-2">{quantities[item.id] || 1}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.id, (quantities[item.id] || 1) + 1)
                  }
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() =>
                  alert(
                    `Seçtiğiniz ürün: ${(quantities[item.id] || 1)} adet ${
                      item.name
                    } toplamda ${
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
  );
}

export default Item;
