import React, { useContext, useState, useEffect } from 'react';
import { BASKET } from '../../context/BasketContext';
import { TiDelete } from "react-icons/ti";
import { Link } from 'react-router-dom';

function Basket() {
  const { sebet, removeFromBasket } = useContext(BASKET);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0); 

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
  
  useEffect(() => {
    const newTotalQuantity = sebet.reduce((total, item) => {
      return total + (quantities[item.id] || 1);
    }, 0);
    setTotalQuantity(newTotalQuantity);
  }, [quantities, sebet]);
  return (
    <div className='container lg:max-w-[1280px] mx-auto p-4 md:flex justify-between'>
      {sebet.length === 0 ? (
        <div className="text-center py-10 mx-auto">
          <img src="https://media.tenor.com/J3mNIbj6A4wAAAAM/empty-shelves-john-travolta.gif" alt="" className='mx-auto'/>
          <h2 className="text-2xl font-bold mb-4">Səbətiniz boşdur!</h2>
          <Link to="/" className="text-blue-500 hover:underline">
            Alış-verişə başla
          </Link>
        </div>
      ) : (
        <>
      <div className='flex flex-wrap gap-6 justify-center'>
        {sebet && sebet.map((item) => (
          <div key={item.id} className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative flex flex-col transition-transform duration-200 hover:scale-105">
            <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
              <button onClick={() => removeFromBasket(item.id)}>
                <TiDelete className="text-2xl text-red-600" />
              </button>
            </div>
            <div className="w-full h-[280px] p-2">
              <img
                className="h-full object-contain"
                src={item.api_featured_image || item.image || 'default-image-url.jpg'}
                alt={item.name || item.title || 'Product Image'}/>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 whitespace-nowrap text-center">
                {item.image
                  ? item.image.slice(0, 15) + (item.image.length > 15 ? "..." : "")
                  : item.title
                  ? item.title.slice(0, 13) + (item.title.length > 13 ? "..." : "")
                  : "Məlumat yoxdur"}
              </h2>

              <h5 className="text-lg font-semibold mb-4 items-center flex justify-center">
                {Math.floor((quantities[item.id] || 1) * (item.name || item.title))}₼
              </h5>
              <div className="flex items-center justify-between mb-2">
                <button onClick={() => updateQuantity(item.id, Math.max((quantities[item.id] || 1) - 1, 1))}className="px-3 py-1 bg-gray-200 rounded">
                  -
                </button>
                <span className="px-3 py-2">{quantities[item.id] || 1}</span>
                <button onClick={() =>updateQuantity(item.id, (quantities[item.id] || 1) + 1) }className="px-3 py-1 bg-gray-200 rounded">
                  +
                </button>
              </div>
              <Link to={`/login/`}>
                <button className="relative mt-4 w-full sm:px-6 py-3 bg-green-500 text-white font-bold rounded overflow-hidden group">
                  <span className="absolute inset-0 w-full h-full bg-green-700 transform translate-x-full transition-transform duration-300 group-hover:translate-x-0"></span>
                  <span className="relative z-10">Satın Al</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className='min-w-[220px] mt-4 sm:mt-0'>
        <table className='table-auto border-collapse text-left bg-white shadow-md rounded sticky top-0 right-0  mx-auto'>
          <thead>
            <tr className='bg-gradient-to-r from-blue-400 to-purple-600 text-white '>
              <th className='px-2 sm:px-4 py-2 border'>Məhsul</th>
              <th className='px-2 sm:px-4 py-2 border'>Miqdar</th>
              <th className='px-2 sm:px-4 py-2 border'>Qiymət (₼)</th>
            </tr>
          </thead>
          <tbody>
            {sebet.map((item) => (
              <tr key={item.id}>
                <td className='px-2 sm:px-4 py-2 border'>{item.image ? item.image :
                  item.title ? item.title :
                    "Məlumat yoxdur"}</td>
                <td className='px-2 sm:px-4 py-2 border text-center'>{quantities[item.id] || 1}</td>
                <td className='px-2 sm:px-4 py-2 border text-center'>{Math.floor((quantities[item.id] || 1) * (item.name || item.title))}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className='px-2 sm:px-4 py-2 border font-bold'>Ümumi</td>
              <td className='px-2 sm:px-4 py-2 border font-bold text-center'>{totalQuantity}</td>
              <td className='px-2 sm:px-4 py-2 border font-bold text-center'>{totalPrice.toFixed(2)}₼</td>
            </tr>
            <tr>
            <td colSpan="3" className="px-4 py-2 text-center">
            <Link to={`/login/`}>
          <button className="relative mt-4 w-full px-6 py-3 bg-green-500 text-white font-bold rounded overflow-hidden group">
            <span className="absolute inset-0 w-full h-full bg-green-700 transform translate-x-full transition-transform duration-500 group-hover:translate-x-0"></span>
            <span className="relative z-10">Satın Al</span>
          </button>
        </Link>
            </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
      )}
    </div>
  );
}

export default Basket;
