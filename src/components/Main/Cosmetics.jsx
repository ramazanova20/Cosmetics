import React, {  useEffect, useState, useContext  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProductByName } from '../../services/api';
import Heart from './Heart';
import { BASKET } from '../../context/BasketContext';
import { useDataContext } from "../../context/DataContext"; 
import { Pagination } from 'antd';
import Loading from './Loading';
function Cosmetics() {
   const { favorites, addToFavorites } = useDataContext(); 
  const location = useLocation();
  const url = location.search;
  const tip = new URLSearchParams(url).get('tip');
  const [data, setData] = useState(null);
  // const [quantities, setQuantities] = useState({});
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
 

  // const updateQuantity = (id, newQuantity) => {
  //   setQuantities((quant) => ({
  //     ...quant,
  //     [id]: newQuantity,
  //   }));
  // };


  const shouldShowImage = !(tip === 'lipstick' || tip === 'foundation' || tip === 'eyeliner');
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data ? data.slice(startIndex, endIndex) : [];

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
          {currentData && currentData.map((item) => (
            <div key={item.id}
            className="max-w-[200px] rounded overflow-hidden shadow-lg bg-white relative flex flex-col"
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
                <h2 className=" font-semibold mb-2 whitespace-nowrap">
                  {item.name.slice(0, 21)}
                </h2>
                <div className='flex justify-center'>
                  <h5 className="text-lg font-semibold mb-4">
                    {item.price}₼
                  </h5>
                </div>
                {/* <div className="flex items-center justify-between mb-2">
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
                </div> */}
                {/* <button
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
                </button> */}
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
