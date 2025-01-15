import React, {  useEffect, useState, useContext  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProductByName } from '../../services/api';
import { useDataContext } from "../../context/DataContext"; 
function Carusell() {
    const location = useLocation();
  const url = location.search;
  const tip = new URLSearchParams(url).get('tip');

  return (
    <>
      <div className="relative flex items-center justify-center sm:w-full dark:text-gray-900">
        <div className="flex items-center justify-start sm:w-full h-full gap-6 py-4 mx-auto overflow-auto lg:gap-8">
          <style>
            {`
              ::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

            <div className="relative flex flex-shrink-0 sm:w-auto">
              <img className="object-cover object-center dark:bg-gray-500 h-96 aspect-square" src="https://images.pexels.com/photos/3148938/pexels-photo-3148938.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Image 1"/>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                <Link to="/cosmetics?tip=foundation">ÜZ üçün Kosmetika</Link>
              </div>
            </div>
            <div className="relative flex flex-shrink-0 w-full sm:w-auto">
              <img className="object-cover object-center dark:bg-gray-500 h-96 aspect-square" src="https://images.pexels.com/photos/5731813/pexels-photo-5731813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Image 2"/>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                <Link to="/cosmetics?tip=eyeliner">GÖZ üçün Kosmetika</Link>
              </div>
            </div>
            <div className="relative flex flex-shrink-0 w-full sm:w-auto">
              <img className="object-cover object-center dark:bg-gray-500 h-96 aspect-square" src="https://images.pexels.com/photos/14581469/pexels-photo-14581469.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Image 3"/>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                <Link to="/cosmetics?tip=lipstick">DODAQ üçün Kosmetika</Link>
              </div>
            </div>
            <div className="relative flex flex-shrink-0 w-full sm:w-auto">
              <img className="object-cover object-center dark:bg-gray-500 h-96 aspect-square" src="https://media.istockphoto.com/id/531786318/photo/top-view-of-female-fashion-accessories.jpg?s=2048x2048&w=is&k=20&c=NzQWlFzOfRhTbmD2I4DjkBeumpxIIWMcFRAU-ttlnlg=" alt="Image 4"/>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                <Link to="/aksesuar">Aksessuarlar</Link>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
export default Carusell;