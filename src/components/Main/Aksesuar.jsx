import React, { useContext, useState, useEffect } from "react";
import { DATA } from "../../context/DataContext";
import Heart from './Heart'; 
import { Link } from "react-router-dom";
import { BASKET } from "../../context/BasketContext";
import { useDataContext } from "../../context/DataContext"; 
import Loading from "./Loading";

function Aksesuar() { 
  const { jewelery, favorites, addToFavorites } = useDataContext();
  const [showProductList, setShowProductList] = useState([]);
  const [sorting, setSorting] = useState("latest");
  const { addToBasket } = useContext(BASKET);

  useEffect(() => {
    if (jewelery) {
      setShowProductList(jewelery);
    }
  }, [jewelery]);

  useEffect(() => {
    if (showProductList.length > 0) {
      handleSortingChange(sorting);
    }
  }, [sorting, jewelery]);

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);

    let sortedProducts = [...jewelery];

    if (newSorting === "high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (newSorting === "low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      sortedProducts = jewelery;
    }

    setShowProductList(sortedProducts);
  };
  if (!jewelery) {
    return <div className="container lg:max-w-[1024px] mx-auto p-3">
    <Loading/>
  </div>;
  }

  return (
    <div>
      <div className='container lg:max-w-[1024px] mx-auto p-3'>
        <h6>Aksessuar və Moda</h6>
        <div className='my-4'>
          <div className="flex flex-col">
            <div>
              Sıralama:
              <select
                name="sorting"
                id="sorting"
                onChange={(e) => handleSortingChange(e.target.value)}
                value={sorting}
              >
                <option value="latest">Son Məhsullar</option>
                <option value="high-to-low">Bahadan Ucuza</option>
                <option value="low-to-high">Ucuzdan Bahaya</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-10 mx-auto justify-center m-1">
              {showProductList.map((item) => {

                return (
                  <div key={item.id} className="max-w-[200px] rounded overflow-hidden shadow-lg bg-white relative">
                    <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
                      <button onClick={() => addToFavorites(item)}>
                        <Heart />
                      </button>
                    </div>
                    <Link to={`/aksesuar/${item.id}`} >
                      <div className="w-full h-[280px] p-1">
                        <img className='object-contain w-full h-3/4' src={item.image} alt={item.title} />
                      </div>
                    </Link>

                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">
                        {item.title.slice(0, 14)}
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
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 block"
                      >
                        Buy
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aksesuar;
