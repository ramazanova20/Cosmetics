import React from 'react'
import JewelryItem from './JewelryItem'

function Aksesuar() {
  return (
    <div>
        <div className='container lg:max-w-[1024px] mx-auto p-3'>
            
                <h6>Aksessuar və Moda</h6>
               
            <div className='bg-slate-400'>
                <div>
                    Sirlama:
                    <select name="" id="">
                        <option value="">Son Mehsullar</option>
                        <option value="">Bahadan Ucuza</option>
                        <option value="">Ucuzdan Bahaya</option>
                    </select>
                </div>
            </div>
            <div className='my-4'>
                AAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCCCCCCC
                <div className="my-4">
                    <JewelryItem/>
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