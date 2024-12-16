import React, { useContext, useState, useEffect } from "react";
import { DATA } from "../../context/DataContext";
import Heart from './Heart'; 
// import JeweleryItem from './JewelryItem'




function Aksesuar() {
    const { jewelery } = useContext(DATA);
      const [showProductList, setShowProductList] = useState([]);
      const [sorting, setSorting] = useState("latest");
      const [quantities, setQuantities] = useState({}); 
    
      useEffect(() => {
        if (jewelery) {
          setShowProductList(jewelery); 
        }
      }, [jewelery]);
    
      useEffect(() => {
        if (showProductList.length > 0) {
          handleSortingChange(sorting); 
        }
      }, [sorting, jewelery]);
    
      const handleSortingChange = (newSorting) => {
        setSorting(newSorting);
    
        let sortedProducts = [...jewelery];
    
        if (newSorting === "high-to-low") {
          sortedProducts.sort((a, b) => b.price - a.price); 
        } else if (newSorting === "low-to-high") {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else {
          sortedProducts = jewelery;
        }
    
        setShowProductList(sortedProducts); 
      };
    
      const updateQuantity = (id, newQuantity) => {
        setQuantities((quant) => ({
          ...quant,
          [id]: newQuantity,
        }));
      };
    
      if (!jewelery) {
        return <div>Loading...</div>;
      }
  return (
    <div>
        <div className='container lg:max-w-[1024px] mx-auto p-3'>
            
                <h6>Aksessuar və Moda</h6>
               
            {/* <div className='bg-slate-400'>
                <div>
                    Sirlama:
                    <select name="" id="">
                        <option value="">Son Mehsullar</option>
                        <option value="">Bahadan Ucuza</option>
                        <option value="">Ucuzdan Bahaya</option>
                    </select>
                </div>
            </div> */}
            
            <div className='my-4'>
            <div className="flex flex-col">
      <div>
        Sıralama:
        <select
          name="sorting"
          id="sorting"
          onChange={(e) => handleSortingChange(e.target.value)}
          value={sorting}
        >
          <option value="latest">Son Məhsullar</option>
          <option value="high-to-low">Bahadan Ucuza</option>
          <option value="low-to-high">Ucuzdan Bahaya</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-10 mx-auto justify-center m-1">
        {showProductList.map((item, i) => {
          const itemQuantity = quantities[item.id] || 1; // Varsayılan miqdar 1
          const totalPrice = Math.floor(itemQuantity * item.price); // Qiyməti yuvarlayır

          return (
            <div
              key={i}
              className="max-w-[200px] h-[500px] rounded overflow-hidden shadow-lg bg-white relative">
              <div className="rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5">
                <Heart />
              </div>
              <div className="w-full h-[280px]">
                <img className='h-full object-contain' src={item.image} alt={item.title} />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">
                  {item.title.slice(0, 17)}
                </h2>
                <h5 className="text-lg font-semibold mb-4">{totalPrice}₼</h5>
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(itemQuantity - 1, 1))
                    }
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="px-3 py-2">{itemQuantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, itemQuantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() =>
                    alert(
                      `You selected ${itemQuantity} ${item.title}(s) for ${totalPrice} ₼.`
                    )
                  }
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Buy
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
            </div>
            <div className='flex flex-col'>
                <p>Aksessuar dedikdə şəxsi aksessuarlar - eynekler, qol saatlari, cantalar, bijuteriyalar və s. bu kimi şeylər və ev aksessuarlarını – suviner kimi aksessuarlar nəzərdə tutulur.</p>
                <p>Şəxsi aksessuarlar.</p>
                <p>Eynek seçimində üz formasına diqqət etmək lazımdır. Bununla birlikdə, çərçivə forması üz formasının əksi şəkildə olmalıdır. Oval üzlər demək olar ki, hər hansı bir çərçivəyə uyğun gəlir. Xüsusilə, onlar yumru çərçivəli eynəkləri seçə bilərlər.</p>
                <p>Kvadrat üzü olanlar oval və dairəvi çərçivələri seçə bilər.</p>
                <p>Qadınların ən sevdiyi aksessuarlardan biri də qol saatlari dır. Aksessuarlar seçərkən bir neçə məqama diqqət edilməlidir.</p>
                <p>Saatın arxasında "water resistant/ water proof" yazılıbsa, bu saatın su keçirməyən olması deməkdir.</p>
                <p>Canta aksesuarlar seçərkən daha çox onun məhsuldarlığını nəzərə alın. Əgər gündəlik istifadə üçün nəzərdə tutmusunuzsa, onda daha çox gözü olan və axtardığınızı asanlıqla tapa biləcəyiniz canta seçməlisiniz. Daha sonra çantanın materialına diqqət edin.</p>
                <p>Parçadan olan çantaları yaz və yay ayları üçün seçsəniz peşman olmazsınız. Lakin, payız və qış ayları üçün parça canta yaxşı fikir deyil.
                Canta aksesuarlar qiymətlərinə gəlsək, əlbəttə büdcənizi nəzərə almalısınız. Lakin əgər, çantaları uzun müddət istifadə edəcəksinizsə, onda ödəcəyiniz hər qəpiyə dəyəcək.</p>
                <p>Ev aksessuarları kimi divar saatı, suvinerlər şəkil çərçivəsi və s. bu kimi əşyalar nəzərdə tutulur.</p>
                <p>Kosmetika.az saytının Aksessuar və Moda kateqoriyasından həm şəxsi aksessuarları, həm də ev aksessuarlarını tapa bilərsiniz.</p>
            </div>
            <div className='flex flex-col'>
                <h6 className='text-blue-700 font-bold'>Kosmetika Məlumatları</h6>
                <ul className='flex flex-col'>
                    <li>
                        Burun və qulaqlara qulluq
                    </li>
                    <li>
                        Üzdəki tükləri tökən maska
                    </li>
                    <li>
                        Mat pomadaların istifadə qaydası
                    </li>

                </ul>
            </div>
        </div>
    </div>
  )
}

export default Aksesuar