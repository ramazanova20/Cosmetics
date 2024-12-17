import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProductByName } from '../../services/api';
import Heart from './Heart';

function Cosmetics({ favorites, setFavorites }) {
  const location = useLocation();
  const url = location.search;
  const tip = new URLSearchParams(url).get('tip');
  const [data, setData] = useState(null);
  const [quantities, setQuantities] = useState({});

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

  const updateQuantity = (id, newQuantity) => {
    setQuantities((quant) => ({
      ...quant,
      [id]: newQuantity,
    }));
  };

  const addToFavorites = (item) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.find((fav) => fav.id === item.id)) return currentFavorites;
      return [...currentFavorites, item];
    });
  };

  const shouldShowImage = !(tip === 'lipstick' || tip === 'foundation' || tip === 'eyeliner');

  return (
    <div>
      <div className="container lg:max-w-[1024px] mx-auto p-3">
        <div>
          <h6>Kosmetika</h6>
          <ul className="flex flex-col md:flex-row gap-4">
            <li><Link to="/cosmetics?tip=foundation">ÜZ üçün Kosmetika</Link></li>
            <li><Link to="/cosmetics?tip=eyeliner">GÖZ üçün Kosmetika</Link></li>
            <li><Link to="/cosmetics?tip=lipstick">DODAQ üçün Kosmetika</Link></li>
            <li><Link to="/aksesuar">Aksessuarlar</Link></li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-10 mx-auto justify-center m-1">
          {data && data.map((item) => (
            <div key={item.id}
            className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative flex flex-col"
          >
              <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
                <button onClick={() => addToFavorites(item)}>
                  <Heart />
                </button>
              </div>
              <Link 
            
            to={`/cosmetics/${item.id}`} className='w-full h-[280px]'>
                <img
                  className='h-full object-contain'
                  src={item.api_featured_image}
                  alt={item.name}
                />
              </Link>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">
                  {item.name.slice(0, 15)}
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
                  onClick={() =>
                    alert(
                      `Seçtiğiniz məhsul: ${quantities[item.id] || 1} ədəd ${item.name} toplamda ${
                        Math.floor((quantities[item.id] || 1) * item.price)
                      } ₼.`
                    )
                  }
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Satın Al
                </button>
              </div>
            </div>
          ))}

          {shouldShowImage && (
            <div className="h-[400px]">
              <img
                src="https://i.pinimg.com/originals/b0/f3/40/b0f3404f2e2f354ca713dd3bde1a3ada.gif"
                alt="Cosmetic gif"
                className='h-[90%]'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cosmetics;
