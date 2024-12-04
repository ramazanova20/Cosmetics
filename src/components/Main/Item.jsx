import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDataContext } from '../../context/DataContext';

function Item() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tip = queryParams.get('tip'); 

  const { lipstick, foundation, eyeliner, jewelery } = useDataContext();
  const [quant, setQuant] = useState(1);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    
    let data;
    if (tip === 'eyeliner') {
      data = eyeliner;
    } else if (tip === 'lipstick') {
      data = lipstick;
    } 
    else if (tip === 'foundation') {
      data = foundation;
    }
    else if (tip === 'jewelery') {
      data = jewelery;
    }

    if (data && JSON.stringify(filteredData) !== JSON.stringify(data)) {
      setFilteredData(data);
    }
  }, [tip, lipstick, foundation, eyeliner, jewelery, filteredData]); 
  // console.log(filteredData)
  if (!filteredData) {
    return <div>Loading...</div>;
  }

  if (filteredData.length === 0) {
    return <div>{tip} is not found.</div>;
  }

  return (
    <div className="flex flex-wrap gap-6 mx-auto justify-center m-1">
      {filteredData.map((item, i) => (
        <div
          key={i}
          className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative"
        >
          <img
            className="w-full h-[300px]"
            src={item.api_featured_image || item.image}
            alt={item.name.slice(0, 10)}
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{item.name || item.title}</h2>
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
              onClick={() =>
                alert(`Seçtiğiniz ürün: ${quant} adet ${item.name} toplamda ${quant * item.price} ₼.`)
              }
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Satın Al
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Item;
