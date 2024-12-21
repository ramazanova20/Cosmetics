import React, { useContext } from "react";
import { DATA } from '../../context/DataContext';
import { Link } from "react-router-dom";
function Melumat() {
  const {info} = useContext(DATA);
  if (!info) {
    return <div>Loading...</div>;  
  }
  return (
    <div  className='container lg:max-w-[1024px] mx-auto p-3'>
      <div>
         Kosmetika məlumatları
      </div>
      <div className="my-4">
      <div className="flex flex-wrap gap-6 mx-auto justify-center m-1">
      {info.map((item,i) => (
        <div key={i} className="max-w-[300px] rounded overflow-hidden shadow-lg bg-white ">
        
          <Link to={`/melumat/${item.id}`} className="w-full h-[280px]">
                      <img className='object-contain' src={item.img} alt={item.title} />
                    </Link>
                      {/* <img className='h-full object-fit' src={item.img} alt={item.title} /> */}
                  
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700 mb-4">{item.description.slice(0, 100)}</p>
            <p className="text-gray-700 mb-4">{item.history}</p>
            
           
          </div>
        </div>
      ))}
    </div>
        </div>
    </div>
  )
}

export default Melumat