import React, { useContext, useState, useEffect } from "react";
import Heart from './Heart'; 
import { Link } from "react-router-dom";
import { BASKET } from "../../context/BasketContext";
import { useDataContext } from "../../context/DataContext"; 
import Loading from "./Loading";
import { SlBasket } from "react-icons/sl";
import { Pagination } from 'antd';

function Aksesuar() { 
  const { jewelery, favorites, addToFavorites } = useDataContext();
  const [showProductList, setShowProductList] = useState([]);
  const [sorting, setSorting] = useState("latest");
  const { addToBasket } = useContext(BASKET);
 const [page, setPage] = useState(1);
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedInfo = showProductList.slice(startIndex, endIndex);
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
  if (!jewelery || jewelery.length === 0) {
    return <div className="container lg:max-w-[1280px] mx-auto p-3">
    <Loading/>
  </div>;
  }

  return (
    <div>
      <div className='container lg:max-w-[1280px] mx-auto p-3'>
        <h1 className=" uppercase italic text-2xl font-bold mb-4">Accessories and Fashion</h1>
        <div className='my-4'>
          <div className="flex flex-col">
            <div>
              Sorting:
              <select
                name="sorting"
                id="sorting"
                onChange={(e) => handleSortingChange(e.target.value)}
                value={sorting}
              >
                <option value="latest">Last Products</option>
                <option value="high-to-low">From Expensive to Cheap</option>
                <option value="low-to-high">From Cheap to Expensive</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-10 justify-center m-1">
              {paginatedInfo.map((item) => {
                return (
                  <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[200px] rounded overflow-hidden shadow-lg bg-white relative mt-4 transition-transform duration-200 hover:scale-105">
                    <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
                      <button onClick={() => addToFavorites(item)}>
                        <Heart />
                      </button>
                    </div>
                    <Link to={`/aksesuar/${item.id}`}>
                      <div className="w-full h-[280px] p-1">
                        <img
                          className="object-contain w-full h-full"
                          src={item.image}
                          alt={item.title}
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2 text-center">
                        {item.title.slice(0, 13) + (item.title.length > 13 ? "..." : "")}
                      </h2>
                      <div className="flex justify-center">
                        <h5 className="text-lg font-semibold mb-4">{item.price}$</h5>
                      </div>
                      <button
                        onClick={() =>
                          addToBasket(
                            item.id,
                            item.api_featured_image || item.image,
                            item.name || item.title,
                            item.price
                          )
                        }
                        className="m-auto text-blue-500 py-2 rounded block"
                      >
                        <div className="font-bold rounded transition-transform duration-300 hover:animate-bounce">
                          <SlBasket className="text-2xl" />
                        </div>
                      </button>
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>
          <div className="flex justify-center py-6">
          <Pagination
            current={page}
            total={showProductList.length} 
            pageSize={pageSize} 
            onChange={(newPage) => setPage(newPage)} 
            className="custom-pagination"
            showSizeChanger={false} 
          />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Aksesuar;
