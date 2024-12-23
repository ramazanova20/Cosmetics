import React from 'react';
import { useAllDataContext } from '../../context/AllDataContext';
import { Link } from 'react-router-dom';

function Brend() {
  const { data } = useAllDataContext();

  if (!data) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No items found.</div>;
  }

  // Təkrarları aradan qaldırmaq üçün unikal brendləri müəyyən edirik
  const uniqueBrands = Array.from(
    new Map(data.map((item) => [item.brand, item])).values()
  );

  return (
    <div>
      <div className="container lg:max-w-[1024px] mx-auto p-3">
        <div>
          <h1 className="text-2xl font-bold mb-4">Brend kosmetika firmalar</h1>
          {uniqueBrands.length > 0 ? (
            <div className="flex flex-wrap gap-4 justify-start pl-0 ">
              {uniqueBrands.map((brand, i) => (
                <div key={i} className="w-[30%] md:w-[20%] p-2">
                  <Link to={`/brend/${brand.brand}`}>
  <p className="text-lg">{brand.brand}</p>
</Link>

                </div>
              ))}
            </div>
          ) : (
            <p>No brands found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Brend;
