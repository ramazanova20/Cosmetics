import React, { createContext, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

export const BASKET = createContext(null);

function BasketContext({ children }) {
  const cook = new Cookies();
  const [count, setCount] = useState(0)
  const [sebet, setSebet] = useState(cook.get("sebet") || []);

  useEffect(()=>{
    setCount(sebet.length )
  },[sebet ])

  function addToBasket(id, api_featured_image, image, name, title, price) {

    setSebet((sebet) => {
      const order = sebet.find((item) => item.id === id);
      if (order) {
        return sebet; 
      }
      const newSebet = [...sebet, {id, api_featured_image, image, name, title,price: price || 0}];
      cook.set("sebet", JSON.stringify(newSebet));
      return newSebet;
    });
  }

  const removeFromBasket = (id) => {
    setSebet((sebet) => {
      const newSebet = sebet.filter((item) => item.id !== id);
      cook.set("sebet", JSON.stringify(newSebet)); 
      return newSebet;
    });
  };

  return (
    <BASKET.Provider
      value={{ sebet, setSebet, addToBasket, removeFromBasket, count }}
    >
      {children}
    </BASKET.Provider>
  );
}

export default BasketContext;
