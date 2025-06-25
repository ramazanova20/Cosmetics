import React, { useEffect,useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductByIdFromMakeupAPI, getProductByIdFromFakeStore} from "../../services/api"; 
import { BASKET } from "../../context/BasketContext";
import Loading from "./Loading";
import Main from "./Main";
import Aksesuar from "./Aksesuar";
// import { SlBasket } from "react-icons/sl";

function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const { addToBasket } = useContext(BASKET);
  const showBrand = !location.pathname.includes("aksesuar");
const showCategory = !location.pathname.includes("cosmetics");

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
  
  if (!product) return <div className="container lg:max-w-[1280px] mx-auto p-3">
  <Loading/>
 </div>;  
 
  return (
    <div className="container lg:max-w-[1280px] mx-auto p-4">
    
<div className="flex gap-4">

      <div className="w-1/3 h-[280px] flex justify-center  relative overflow-hidden rounded-lg">
        
        <img
          className="absolute  h-full transition-transform duration-300"
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
      <div className="p-4 w-2/3">
              {showBrand && (
          <h5 className="text-lg font-semibold mb-4 text-green-500">
            "{product.brand}" Brand
          </h5>
        )}

        {showCategory && (
          <h5 className="text-lg font-semibold mb-4 text-green-500">
            "{product.category}" Category
          </h5>
        )}

        <h2 className="text-xl font-semibold mb-2">{product.name || product.title}</h2>
        <h5 className="text-lg font-semibold mb-4">
         {product.price}$   
        </h5>
        <div className="">
        <h5 className="text-lg font-semibold mb-4">
          About: 
        </h5>
        <p className="leading-loose"> {product.description}</p>
        </div>
       
        <button
          onClick={() => addToBasket( product.id,
            product.api_featured_image || product.image, 
            product.name || product.title,  product.description,
            product.price)}
          className="m-auto w-full py-2 block relative px-6 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded overflow-hidden group">
            <span className="absolute inset-0 bg-blue-800 opacity-25 transform scale-0 rounded-full group-hover:scale-150 transition-transform duration-500"></span>
            <span className="relative font-bold">Add to Basket</span>
          </button>
       
      </div>
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