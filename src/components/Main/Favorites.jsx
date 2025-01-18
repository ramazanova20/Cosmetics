import React, { useContext, useState} from "react";
import { TiDelete } from "react-icons/ti";
import { useDataContext } from "../../context/DataContext";
import { BASKET } from "../../context/BasketContext";
import { Link } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
function Favorites() {
  const { favorites, removeFromFavorites } = useDataContext(); 


 const { addToBasket } = useContext(BASKET);
  return (
    <div className="container lg:max-w-[1280px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 uppercase italic">Seçilmiş Məhsullar</h1>
       {favorites.length === 0 ? (
              <div className="text-center py-10">
                <img src="https://i.pinimg.com/originals/a0/26/23/a02623143702407373cf63d686054335.gif" alt="" className="m-auto" />
                <h2 className="text-2xl font-bold mb-4"> You don't like anything!</h2>
                <Link to="/" className="text-blue-500 hover:underline">
                  Lets discover the products
                </Link>
              </div>
            ) : (
              <>
      <div className="flex flex-wrap gap-6">
        {favorites.map((item) => (
          <div key={item.id} className="max-w-[200px]  rounded overflow-hidden shadow-lg bg-white relative flex flex-col transition-transform duration-200 hover:scale-105">
            <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
              <button onClick={() => removeFromFavorites(item.id)}>
                <TiDelete className="text-2xl text-red-600"/>
              </button>
            </div>
            <Link to={
              ["women's clothing", "men's clothing", "jewelery", "electronics"].includes(item.category)
                ? `/aksesuar/${item.id}`
                : `/cosmetics/${item.id}`}>
              <div className="w-full h-[280px] p-2">
                <img
                  className="h-full object-contain"
                  src={item.api_featured_image || item.image || 'default-image-url.jpg'}
                  alt={item.name || item.title || 'Product Image'}/>
              </div>
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 whitespace-nowrap text-center">
                {(item.name?.slice(0, 15)) || (item.title?.slice(0, 15))}
              </h2>
              <h5 className="text-lg font-semibold mb-4 flex justify-center">
                { item.price}₼
              </h5>
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
      </div>
      </>
      )}
    </div>
   
  );
}

export default Favorites;
