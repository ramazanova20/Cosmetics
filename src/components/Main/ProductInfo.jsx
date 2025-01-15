import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { DATA } from '../../context/DataContext';
import { getInfoById } from "../../services/api"; 
import { Pagination } from 'antd';

function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { info } = useContext(DATA);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getInfoById(id); 
        setProduct(data); 
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!info) {
    return (
      <div className="container lg:max-w-[1280px] mx-auto p-3">
        <Loading />
      </div>
    );  
  }

  if (!product) {
    return (
      <div className="container lg:max-w-[1280px] mx-auto p-3">
        <Loading />
      </div>
    ); 
  }

  // Calculate the data to display for the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedInfo = info.slice(startIndex, endIndex);

  return (
    <div className="container lg:max-w-[1280px] mx-auto p-4">
      <div className="w-full h-[280px]">
        <img className="h-full object-contain" src={product.img} alt={product.title} />
      </div>
      <div className="py-4">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-4 leading-8">{product.description}</p>
        <p className="text-gray-700 mb-4 italic">{product.history}</p>
      </div>
      <div className="my-4">
        <h1 className=" uppercase italic text-2xl font-bold mb-4">Useful Information</h1>
        <div className="flex flex-wrap gap-4 mx-auto justify-center m-1">
          {paginatedInfo.map((item, i) => (
            <div key={i} className="max-w-[300px] rounded overflow-hidden shadow-lg bg-white">
              <Link to={`/melumat/${item.id}`}>
                <div className="w-full h-[200px]">
                  <img
                    className="object-cover w-full h-full"
                    src={item.img}
                    alt={item.title}
                  />
                </div>
              </Link>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-700 mb-4">{item.description.slice(0, 100)}</p>
                <p className="text-gray-700 mb-4 italic">{item.history}</p>
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
  );
}

export default ProductInfo;
