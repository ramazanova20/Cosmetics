import React, { useEffect,useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByIdFromMakeupAPI, getProductByIdFromFakeStore} from "../../services/api"; 
import { BASKET } from "../../context/BasketContext";
import Loading from "./Loading";
import Main from "./Main";
import Aksesuar from "./Aksesuar";


function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  // const [quantity, setQuantity] = useState(1);  
  const { addToBasket } = useContext(BASKET);
  useEffect(() => {
    const fetchProduct = location.pathname.includes("aksesuar") 
      ? getProductByIdFromFakeStore(id) 
      : getProductByIdFromMakeupAPI(id);
  
    fetchProduct
      .then(setProduct)
      .catch((err) => console.error("Error:", err));
  }, [id, location.pathname]);
  
  // useEffect(() => {
  //   getProductById(id)  
  //     .then((data) => setProduct(data))  
  //     .catch((err) => console.error("Məhsul tapılmadı:", err));
  // }, [id]);

  if (!product) return <div className="container lg:max-w-[1024px] mx-auto p-3">
  <Loading/>
 </div>;  
 
  return (
    <div className="container lg:max-w-[1024px] mx-auto p-4">
        
      {/* <h1 className="text-2xl font-bold mb-4">{product.name || product.title}</h1> */}
      <div className="w-full h-[280px]">
        
        <img
          className="h-full object-contain"
          src={product.api_featured_image || product.image} 
          alt={product.name || product.title} 
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name || product.title}</h2>
        <h5 className="text-lg font-semibold mb-4">
          {product.price}₼   
        </h5>
        <p>{product.description}</p>
        {/* <div className="flex items-center mb-2">
          <button
            onClick={() => setQuantity(Math.max(quantity - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span className="px-3 py-2">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div> */}
        <button
          onClick={() => addToBasket( product.id,
            product.api_featured_image || product.image, 
            product.name || product.title,  product.description,
            product.price)}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 block"
        >
          Buy
        </button>
      </div>
      { 
  product.category === "women's clothing" || 
  product.category === "men's clothing" || 
  product.category === "jewelery" || 
  product.category === "electronics" 
  ? <Aksesuar/> 
  : <Main />
}

    </div>
  );
}

export default ProductDetail;