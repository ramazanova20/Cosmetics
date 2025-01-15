import React, { useContext,useState } from "react";
import { DATA } from '../../context/DataContext';
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { Pagination } from 'antd';
function Melumat() {
  const {info} = useContext(DATA);
  if (!info) {
    return <div><Loading/></div>;  
  }
   const [page, setPage] = useState(1);
    const pageSize = 12;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedInfo = info.slice(startIndex, endIndex);
  return (
    <div  className='container lg:max-w-[1280px] mx-auto p-3'>
      <h1 className="text-2xl font-bold mb-4 uppercase italic">
         Kosmetika məlumatları
      </h1>
      <div className="my-4">
      <div className="flex flex-wrap gap-4 mx-auto justify-center m-1">
      {paginatedInfo.map((item,i) => (
        <div key={i} className="max-w-[300px] rounded overflow-hidden shadow-lg bg-white transition-transform duration-200 hover:scale-105">
        
          <Link to={`/melumat/${item.id}`}>
            <div className="w-full h-[200px]">
              <img className="object-cover w-full h-full" src={item.img} alt={item.title}/>
            </div>           
          </Link>      
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700 mb-4">{item.description.slice(0, 100)}</p>
            <p className="text-gray-700 mb-4">{item.history}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center py-6">
          <Pagination
            current={page}
            total={info.length} 
            pageSize={pageSize} 
            onChange={(newPage) => setPage(newPage)} 
            className="custom-pagination"
            showSizeChanger={false} 
          />
        </div>
        </div>
    </div>
  )
}

export default Melumat