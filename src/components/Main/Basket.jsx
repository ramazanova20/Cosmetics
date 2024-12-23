import React, { useContext, useState, useEffect } from 'react';
import { BASKET } from '../../context/BasketContext';
import { TiDelete } from "react-icons/ti";
import { Link } from 'react-router-dom';

function Basket() {
  const { sebet, removeFromBasket } = useContext(BASKET);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const updateQuantity = (id, newQuantity) => {
    setQuantities((quant) => ({
      ...quant,
      [id]: newQuantity,
    }));
  };
  

  // Ümumi qiyməti hesablayan effekt
  useEffect(() => {
    const newTotalPrice = sebet.reduce((total, item) => {
      const quantity = quantities[item.id] || 1;
      return total + quantity * (item.name || item.title);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [quantities, sebet]);
  

  return (
    <div className='container lg:max-w-[1024px] mx-auto p-4'>
      {/* Ümumi Qiyməti Göstər */}
      <div className="text-xl font-bold mb-4">
        Ümumi Qiymət: {totalPrice.toFixed(2)} ₼
      </div>
      <div className='flex flex-wrap gap-6'>
        {sebet && sebet.map((item) => (
          <div key={item.id} className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative flex flex-col">
            <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
              <button onClick={() => removeFromBasket(item.id)}>
                <TiDelete />
              </button>
            </div>
            <div className="w-full h-[280px]">
              <img
                className='h-full object-contain'
                src={item.api_featured_image || item.image || 'default-image-url.jpg'}
                alt={item.name || item.title || 'Product Image'}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">
                {item.image ? item.image :
                  item.title ? item.title :
                    "Məlumat yoxdur"}
              </h2>
              <h5 className="text-lg font-semibold mb-4">
                {Math.floor((quantities[item.id] || 1) * (item.name || 0))}₼
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
              <Link to={`/login/`}>
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Satın Al
                </button>
              </Link>
              {/* <p>
                {`${quantities[item.id] || 1} ədəd ${item.name || item.title} toplamda ${
                  Math.floor((quantities[item.id] || 1) * (item.price || 0))
                } ₼.`}
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Basket;
