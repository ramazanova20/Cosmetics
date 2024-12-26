import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAllDataContext } from '../../context/AllDataContext';
import Heart from './Heart';
import Loading from './Loading';

function BrendInfo() {
  const { brand } = useParams(); 
  const { data } = useAllDataContext();

  if (!data) {
    return <div className="container lg:max-w-[1280px] mx-auto p-3">
    <Loading/>
  </div>;
  }

  if (!brand) {
    return <div>Brand is not specified in the URL.</div>;
  }

  // Brendə aid məhsulları filtrələyirik
  const filteredProducts = data.filter(
    (item) =>
      item.brand &&
      brand &&
      item.brand.toLowerCase().trim() === brand.toLowerCase().trim()
  );

  if (filteredProducts.length === 0) {
    return <div>No products found for this brand.</div>;
  }

  return (
    <div>
      <div className="container lg:max-w-[1280px] mx-auto p-3">
        <h1 className="text-2xl font-bold mb-4">{brand} Məhsulları</h1>
        <div className="my-4">
          <div className="flex flex-wrap gap-6 mx-auto justify-center m-1">
            {filteredProducts.map((item, i) => (
              <div
                key={i}
                className="max-w-[200px] rounded overflow-hidden shadow-lg bg-white relative"
              >
                <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
                  <Heart />
                </div>
                <Link 
            
            to={`/cosmetics/${item.id}`} >
              <img
                  className=" w-full h-2/4"
                  src={item.api_featured_image}
                  alt={item.name.slice(0, 10)}
                />
            </Link>
               
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <h5 className="text-lg font-semibold mb-4">{ item.price}₼</h5>
                  <button
                        onClick={() => addToBasket( item.id,
                          item.api_featured_image || item.image, 
                          item.name || item.title, 
                          item.price)}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 block"
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

export default BrendInfo;
