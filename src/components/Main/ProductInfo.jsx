import React, { useEffect, useState } from "react";
import { getInfoById } from "../../services/api";
import { useParams } from "react-router-dom";

function ProductInfo() {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Məhsul məlumatlarını saxlamaq üçün state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getInfoById(id); // API-dən məlumatı gətirir
        setProduct(data); // Məlumatı state-ə yazır
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Məlumat yüklənərkən göstərilir
  }

  return (
    <div className="container lg:max-w-[1024px] mx-auto p-4">
      <div className="w-full h-[280px]">
        <img className="h-full object-contain" src={product.img} alt={product.title} />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-gray-700 mb-4">{product.history}</p>
      </div>
    </div>
  );
}

export default ProductInfo;
