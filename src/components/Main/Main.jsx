import React from 'react'
import MainBasic from './MainBasic'
import Cosmetics from './Cosmetics'

import { useAllDataContext } from '../../context/AllDataContext';
import Heart from './Heart';

function Main() {
  const { data } = useAllDataContext();

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No items found.</div>;
  }
  return (
    <div >
        
        {/* <Cosmetics/>  */}
        {/* <AllItem/> */}
        <div className="container lg:max-w-[1024px] mx-auto p-3">
          <div className="my-4">
          <div className="flex flex-wrap gap-6 mx-auto justify-center m-1">
             {data.map((item, i) => (
            <div
            key={i}
            className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative">
            <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
              <Heart/>
            </div>
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
          </div>
        </div>
        
        
    </div>
  )
}

export default Main