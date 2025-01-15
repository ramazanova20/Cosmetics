import React, {  useEffect, useState, useContext  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProductByName } from '../../services/api';
import Heart from './Heart';
import { BASKET } from '../../context/BasketContext';
import { useDataContext } from "../../context/DataContext"; 
import { Pagination } from 'antd';
import { SlBasket } from "react-icons/sl";
import Carusell from './Carusell'; // Düzgün yoldan daxil edin


function Cosmetics() {
   const { favorites, addToFavorites } = useDataContext(); 
  const location = useLocation();
  const url = location.search;
  const tip = new URLSearchParams(url).get('tip');
  const [data, setData] = useState(null);
  const { addToBasket } = useContext(BASKET);
  const [page, setPage] = useState(1);
  const pageSize = 15;
  useEffect(() => {
    if (tip) {
      getProductByName(tip)
        .then((res) => setData(res))
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      setData(null);
    }
  }, [tip]);
 


  const shouldShowImage = !(tip === 'lipstick' || tip === 'foundation' || tip === 'eyeliner');
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data ? data.slice(startIndex, endIndex) : [];

  return (
    <div>
      <div className="container lg:max-w-[1280px] mx-auto p-3">
        <div>
          <h1 className='text-2xl font-bold mb-4 uppercase italic'>Kosmetika</h1>
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <div className="relative group inline-block">
                <span className="absolute inset-0  bg-pink-500 opacity-30 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center text-black text-lg">
                <Link to="/cosmetics?tip=foundation">ÜZ üçün Kosmetika</Link>
                </span>
              </div>
            </li>
            <li>
            <div className="relative group inline-block">
              <span className="absolute inset-0 bg-pink-500 opacity-30 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center text-black text-lg">
              <Link to="/cosmetics?tip=eyeliner">GÖZ üçün Kosmetika</Link>
              </span>
            </div>
            </li>
            <li>
            <div className="relative group inline-block">
              <span className="absolute inset-0  bg-pink-500 opacity-30 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center text-black text-lg">
              <Link to="/cosmetics?tip=lipstick">DODAQ üçün Kosmetika</Link>
              </span>
            </div>
            </li>
            <li>
            <div className="relative group inline-block">
              <span className="absolute inset-0 bg-pink-500 opacity-30 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center justify-center text-black text-lg">
              <Link to="/aksesuar">Aksessuarlar</Link>
              </span>
            </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-10 mx-auto justify-center m-1">
          {currentData && currentData.map((item) => (
            <div key={item.id} className="max-w-[200px] rounded overflow-hidden shadow-lg bg-white relative flex flex-col transition-transform duration-200 hover:scale-105">
              <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
                <button onClick={() => addToFavorites(item)}>
                  <Heart />
                </button>
              </div>
              <Link to={`/cosmetics/${item.id}`} className='w-full h-[290px]'>
                <img className='h-full object-contain' src={item.api_featured_image} alt={item.name}/>
              </Link>
              <div className="p-4">
                <h2 className=" font-semibold mb-2 whitespace-nowrap">
                  {item.name.slice(0, 20) + (item.name.length > 20 ? "..." : "")}
                </h2>
                <div className='flex justify-center'>
                  <h5 className="text-lg font-semibold mb-4">
                    {item.price}₼
                  </h5>
                </div>
                <button
                  onClick={() => addToBasket( item.id,
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
          {shouldShowImage && (
            <div className="">
              <Carusell/>
            </div>
          )}
        </div>
        <div className="flex justify-center py-6">
          {!shouldShowImage && (
            <Pagination
              current={page}
              total={data ? data.length : 0}
              pageSize={pageSize}
              onChange={(newPage) => setPage(newPage)}
              className="custom-pagination"
              showSizeChanger={false} 
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default Cosmetics;
