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
  

  useEffect(() => {
    const newTotalPrice = sebet.reduce((total, item) => {
      const quantity = quantities[item.id] || 1;
      return total + quantity * (item.name || item.title);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [quantities, sebet]);
  

  return (
    <div className='container lg:max-w-[1280px] mx-auto p-4'>
      <div className='flex flex-wrap gap-6'>
        {sebet && sebet.map((item) => (
          <div key={item.id} className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative flex flex-col">
            <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
              <button onClick={() => removeFromBasket(item.id)}>
                <TiDelete />
              </button>
            </div>
          <Link
            to={
              ["women's clothing", "men's clothing", "jewelery", "electronics"].includes(item.category)
                ? `/aksesuar/${item.id}`
                : `/cosmetics/${item.id}`
            }
          >
            <div className="w-full h-[280px]">
              <img
                className="h-full object-contain"
                src={item.api_featured_image || item.image || 'default-image-url.jpg'}
                alt={item.name || item.title || 'Product Image'}
              />
            </div>
          </Link>


            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">
                {item.image ? item.image :
                  item.title ? item.title :
                    "Məlumat yoxdur"}
              </h2>
              <h5 className="text-lg font-semibold mb-4 items-center">
                {Math.floor((quantities[item.id] || 1) * (item.name || item.title))}₼
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
            </div>
          </div>
        ))}
      </div>
      <Link to={`/login/`}>
        <div className='p-4 flex flex-col items-center'>
          
                <div className='w-[300px] flex justify-center p-2 mb-4 bg-sky-700 text-white'> Ümumi Qiymət: {totalPrice.toFixed(2)} ₼</div>
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Satın Al
                </button>
        </div>
      </Link>
      <div className='p-4'>
        <table className='table-auto border-collapse w-full text-left bg-white shadow-md rounded'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='px-4 py-2 border'>Məhsul</th>
              <th className='px-4 py-2 border'>Miqdar</th>
              <th className='px-4 py-2 border'>Qiymət (₼)</th>
            </tr>
          </thead>
          <tbody>
            {sebet.map((item) => (
              <tr key={item.id}>
                <td className='px-4 py-2 border'>{item.image ? item.image :
                  item.title ? item.title :
                    "Məlumat yoxdur"}</td>
                <td className='px-4 py-2 border'>{quantities[item.id] || 1}</td>
                <td className='px-4 py-2 border'>{Math.floor((quantities[item.id] || 1) * (item.name || item.title))}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className='px-4 py-2 border font-bold'>Ümumi</td>
              <td className='px-4 py-2 border'></td>
              <td className='px-4 py-2 border font-bold'>{totalPrice.toFixed(2)}₼</td>
            </tr>
          </tfoot>
        </table>
        <Link to={`/login/`}>
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Satın Al
          </button>
        </Link>
      </div>
      {/* <Link to={`/login/`}>
      <div className="text-xl font-bold mb-4">
        Ümumi Qiymət: {totalPrice.toFixed(2)} ₼
      </div>
      </Link> */}
    </div>
  );
}

export default Basket;
