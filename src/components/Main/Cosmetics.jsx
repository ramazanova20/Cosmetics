import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProductByName } from '../../services/api';
import Heart from './Heart';

function Cosmetics() {
  const location = useLocation();
  const url = location.search;
  const tip = new URLSearchParams(url).get('tip'); // Extract 'tip' parameter from the URL
  const [data, setData] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [sortOrder, setSortOrder] = useState("latest"); // Sorting state

  useEffect(() => {
    if (tip) {
      getProductByName(tip)
        .then((res) => setData(res))
        .catch((error) => {
          console.error("Error fetching data:", error.response || error.message);
          alert("Veri alınırken bir hata oluştu. Daha sonra tekrar deneyin.");
        });
    } else {
      setData(null);
    }
  }, [tip]);
  

  const updateQuantity = (id, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedData = data
    ? [...data].sort((a, b) => {
        if (sortOrder === "low-to-high") {
          return a.price - b.price;
        } else if (sortOrder === "high-to-low") {
          return b.price - a.price;
        }
        return 0; // Default (no sorting)
      })
    : [];

  return (
    <div>
      <div className="container lg:max-w-[1024px] mx-auto p-3">
        <div>
          <h6>Kosmetika</h6>
          <ul className="flex flex-col md:flex-row gap-4">
            <li><Link to={"/cosmetics?tip=foundation"}>ÜZ üçün Kosmetika</Link></li>
            <li><Link to={"/cosmetics?tip=eyeliner"}>GÖZ üçün Kosmetika</Link></li>
            <li><Link to={"/cosmetics?tip=lipstick"}>DODAQ üçün Kosmetika</Link></li>
            <li><Link to={"/aksesuar"}>Aksessuarlar</Link></li>
          </ul>
        </div>
        
        <div className="my-4">
          <label htmlFor="sorting">Sıralama:</label>
          <select
            id="sorting"
            value={sortOrder}
            onChange={handleSortChange}
            className="ml-2 border rounded p-1"
          >
            <option value="latest">Son Məhsullar</option>
            <option value="high-to-low">Bahadan Ucuza</option>
            <option value="low-to-high">Ucuzdan Bahaya</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-10 mx-auto justify-center m-1">
          {sortedData.length > 0 ? (
            sortedData.map((item, i) => (
              <div key={i} className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative flex flex-col">
                <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
                  <Heart />
                </div>
                <div className='w-full h-[280px]'>
                  <img
                    className='h-full object-contain'
                    src={item.api_featured_image}
                    alt={item.name}
                  />
                </div>

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
                        `Seçtiğiniz ürün: ${(quantities[item.id] || 1)} adet ${item.name} toplamda ${Math.floor((quantities[item.id] || 1) * item.price)} ₼.`
                      )
                    }
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  >
                    Satın Al
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No items found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Cosmetics;
