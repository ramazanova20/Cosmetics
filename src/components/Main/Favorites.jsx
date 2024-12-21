import React, { useContext, useState} from "react";
import { TiDelete } from "react-icons/ti";
import { useDataContext } from "../../context/DataContext";
import { BASKET } from "../../context/BasketContext";

function Favorites() {
  const { favorites, removeFromFavorites } = useDataContext(); 
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (id, newQuantity) => {
    setQuantities((quant) => ({
      ...quant,
      [id]: newQuantity,
    }));
  };
 const { addToBasket } = useContext(BASKET);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Seçilmiş Məhsullar</h2>
      <div className="flex flex-wrap gap-6">
        {favorites.map((item) => (
          <div key={item.id} className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative flex flex-col">
            <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
              <button onClick={() => removeFromFavorites(item.id)}>
                <TiDelete />
              </button>
            </div>
            <div className='w-full h-[280px]'>
              <img
                className='h-full object-contain'
                src={item.api_featured_image || item.image || 'default-image-url.jpg'}
                alt={item.name || item.title || 'Product Image'}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">
                {(item.name?.slice(0, 15)) || (item.title?.slice(0, 15))}
              </h2>

              <h5 className="text-lg font-semibold mb-4">
                {Math.floor((quantities[item.id] || 1) * item.price)}₼
              </h5>
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max((quantities[item.id] || 1) - 1, 1))
                  }
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="px-3 py-2">{quantities[item.id] || 1}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.id, (quantities[item.id] || 1) + 1)
                  }
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <button
                        onClick={() => addToBasket( item.id,
                          item.api_featured_image || item.image, 
                          item.name || item.title, 
                          item.price)}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 block"
                      >
                        Buy
                      </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
