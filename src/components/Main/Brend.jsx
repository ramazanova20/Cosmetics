import React from 'react';
import { useAllDataContext } from '../../context/AllDataContext';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function Brend() {
  const { data } = useAllDataContext();

  if (!data) {
    return <div className="container lg:max-w-[1280px] mx-auto p-3">
    <Loading/>
  </div>;
  }
  if (data.length === 0) {
    return <div>No items found.</div>;
  }
  const uniqueBrands = Array.from(
    new Map(data.map((item) => [item.brand, item])).values()
  );
  return (
    <div>
      <div className="container lg:max-w-[1280px] mx-auto p-3">
        <div>
          <h1 className="text-2xl font-bold mb-4 uppercase italic">Brend kosmetika firmalar</h1>
          {uniqueBrands.length > 0 ? (
            <div className="flex flex-wrap  justify-start ">
              {uniqueBrands.map((brand, i) => (
                <div key={i} className="w-full sm:w-[40%] md:w-[35%] lg:w-[25%] py-2 transition-transform duration-200 hover:scale-105">
                <Link to={`/brend/${brand.brand}`} className='flex flex-row items-center space-x-4'>
                  <img 
                    src="https://i.pinimg.com/736x/4d/cb/3d/4dcb3d3099e55192022f8934ddf11dc2.jpg" 
                    alt="" 
                    className='h-20 rounded-full' 
                  />
                  <div className="relative group inline-block">
                    <span className="absolute inset-0 bg-pink-500 opacity-0 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center justify-center">
                      <p className="text-lg uppercase italic mt-4">{brand.brand}</p>
                    </span>
                  </div>
                </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No brands found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Brend;
