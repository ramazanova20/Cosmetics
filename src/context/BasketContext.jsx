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

  function addToBasket(id, image, title, price) {

    setSebet((prevSebet) => {
      const newSebet = [...prevSebet, { id, image, title, price }];
      cook.set("sebet", JSON.stringify(newSebet));
      return newSebet;
    });
  }

  const removeFromBasket = (id) => {
    setSebet((prevSebet) => {
      const newSebet = prevSebet.filter((item) => item.id !== id);
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
