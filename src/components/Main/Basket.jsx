import React, { useContext } from 'react'
import { BASKET } from '../../context/BasketContext'
import { TiDelete } from "react-icons/ti";

function Basket() {
    const { sebet } = useContext(BASKET);
const {removeFromBasket}=useContext(BASKET)
    return (
        <div>
            {sebet && sebet.map((item, index) => {
                return (
                    <div key={index} className="container mx-auto p-4 relative ">
                        <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 ">
                                      <button onClick={() => removeFromBasket(item.id)}>
                                      <TiDelete />
                                      </button>
                                    </div>
                        <div className="w-full h-[280px]">
                            <img
                                className="h-full object-contain"
                                src={item.image}
                                alt={item.title}
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                            <h5 className="text-lg font-semibold mb-4">
                                {Math.floor(item.count * item.price)}₼
                            </h5>
                            {/* <p>Miqdar: {item.count}</p> */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


export default Basket