import React, {useContext, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAllDataContext } from '../../context/AllDataContext';
import Heart from './Heart';
import Loading from './Loading';
import { SlBasket } from "react-icons/sl";
import { BASKET } from "../../context/BasketContext";
function BrendInfo() {
  const { brand } = useParams(); 
  const { data } = useAllDataContext();
 const { addToBasket } = useContext(BASKET);
  if (!data) {
    return <div className="container lg:max-w-[1280px] mx-auto p-3">
    <Loading/>
  </div>;
  }

  if (!brand) {
    return <div>Brand is not specified in the URL.</div>;
  } 
  const filteredProducts = data.filter(
    (item) =>
      item.brand &&
      brand &&
      item.brand.toLowerCase().trim() === brand.toLowerCase().trim()
  );
  
  if (filteredProducts.length === 0) {
    return <div className=''>
      <div className="text-center py-10 mx-auto">
                <img src="https://minteventrentals.com/public/templates/mint/images/noproductfound.png" alt="" className='mx-auto'/>
                <h2 className="text-2xl font-bold mb-4"> No products found for this brand.</h2>
                <Link to="/brend" className="text-blue-500 hover:underline">
                  Try New Brands
                </Link>
              </div>
     </div>;
  }

  return (
    <div>
      <div className="container lg:max-w-[1280px] mx-auto p-3">
        <div className='flex'>
          <h1 className="text-2xl font-bold mb-4 mr-2 italic text-green-500">"{brand}" </h1>
          <h1 className="text-2xl font-bold mb-4">Məhsulları</h1>
        </div>
        <div className="my-4">
          <div className="flex flex-wrap gap-10 mx-auto justify-center m-1">
            {filteredProducts.map((item, i) => (
              <div key={i} className="max-w-[200px] rounded overflow-hidden shadow-lg bg-white relative">
                <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
                  <Heart />
                </div>
                <Link to={`/cosmetics/${item.id}`} >
                  <img className=" w-full h-2/4" src={item.api_featured_image} alt={item.name}/>
                </Link>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-center whitespace-nowrap">{item.name.slice(0, 14) + (item.name.length > 14 ? "..." : "")}</h2>
                  <h5 className="text-lg font-semibold mb-4 flex justify-center">{ item.price}₼</h5>
                   <button onClick={() => addToBasket( item.id,
                      item.api_featured_image || item.image, 
                      item.name || item.title, 
                      item.price)}
                    className="m-auto text-blue-500 py-2 rounded block">
                    <div className=" font-bold rounded transition-transform duration-300 hover:animate-bounce">
                      <SlBasket className="text-2xl" />
                    </div>
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
