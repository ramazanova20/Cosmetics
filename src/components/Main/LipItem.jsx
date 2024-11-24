import React, { useContext, useState } from 'react';
import Heart from './Heart';
import { DATA } from '../../context/DataContext';

function LipItem() {
  const {lip} = useContext(DATA); 
  const [quant, setQuant] = useState(1);

  if (!lip) {
    return <div>Loading...</div>;  
  }

  return (
    <div className="flex flex-wrap gap-6 mx-auto justify-center m-1">
      {lip.map((item,i) => (
        <div key={i} className="max-w-[200px] rounded overflow-hidden shadow-lg bg-white relative">
          <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
            <Heart />
          </div>
          <img className="w-full" src={item.api_featured_image} alt={item.name} />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            {/* <p className="text-gray-700 mb-4">{item.description}</p> */}
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


export default LipItem