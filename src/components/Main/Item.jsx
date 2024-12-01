import React, { useContext, useState } from 'react';
import { useDataContext } from '../../context/DataContext'; 
import { useParams } from 'react-router-dom';

function Item() {
  const { category } = useParams(); 
  const { lip, foundation, eye, jewelery } = useDataContext(); 
  const [quant, setQuant] = useState(1);

  let filteredData;

  // `category`-yə uyğun datanı filtrlə
  if (category === 'eyeshadow' || category === 'eyeliner' || category === 'mascara') {
    filteredData = eye; // `eye` datasını götür
  } else if (category === 'lipstick' || category === 'lip_liner') {
    filteredData = lip;
  } else if (category === 'powder' || category === 'cream') {
    filteredData = foundation;
  } else if (category === 'jewelery') {
    filteredData = jewelery;
  }

  // Əgər data mövcud deyilsə və ya boşdursa, yükləmə mesajı göstər
  if (!filteredData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-6 mx-auto justify-center m-1">
      {filteredData.map((item, i) => (
        <div key={i} className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative">
          <img
            className="w-full h-[300px]"
            src={item.api_featured_image} 
            alt={item.name.slice(0, 10)}
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
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
              onClick={() => alert(`You selected ${quant} ${item.name}(s) for ${quant * item.price} ₼.`)}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Item;
