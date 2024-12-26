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
  const { addToBasket } = useContext(BASKET);
  useEffect(() => {
    const fetchProduct = location.pathname.includes("aksesuar") 
      ? getProductByIdFromFakeStore(id) 
      : getProductByIdFromMakeupAPI(id);
  
    fetchProduct
      .then(setProduct)
      .catch((err) => console.error("Error:", err));
  }, [id, location.pathname]);
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x: `${x}%`, y: `${y}%` });
  };
  // useEffect(() => {
  //   getProductById(id)  
  //     .then((data) => setProduct(data))  
  //     .catch((err) => console.error("Məhsul tapılmadı:", err));
  // }, [id]);

  if (!product) return <div className="container lg:max-w-[1280px] mx-auto p-3">
  <Loading/>
 </div>;  
 
  return (
    <div className="container lg:max-w-[1280px] mx-auto p-4">
        
      <div className="w-full h-[280px]  relative overflow-hidden rounded-lg"
      style={{
        width: "200px", 
        height: "400px", 
      }}>
        
        <img
          className="absolute w-full h-auto transition-transform duration-300"
        style={{
          transform: "scale(1)",
          transformOrigin: `${position.x} ${position.y}`,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(2)"; 
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"; 
        }}
      
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