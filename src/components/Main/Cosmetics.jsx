import React, { useEffect, useState } from 'react';
import Item from './Item';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import { getProductByName } from '../../services/api';

function Cosmetics() {
  const url = window.location.search
  const tip = (url.split("=").at(-1));
  const [data, setData] = useState(null)
  useEffect(() => {
    getProductByName(tip).then(res => {
      // console.log(res);
      setData(res)
    }
    )
  }, [])

  return (
    <div>
      <div className="container lg:max-w-[1024px] mx-auto p-3">
        {/* <Breadcrumb/> */}
        <div>
          <h6>Kosmetika</h6>
          <ul className="flex flex-col md:flex-row gap-4">
            <li><Link to={"/cosmetics?tip=foundation"}>ÜZ üçün Kosmetika</Link></li>
            <li><Link to={"/cosmetics?tip=eyeliner"}>GÖZ üçün Kosmetika</Link></li>
            <li><Link to={"/cosmetics?tip=lipstick"}>DODAQ üçün Kosmetika</Link></li>
            <li><Link to={"/aksesuar"}>Aksessuarlar</Link></li>

          </ul>
        </div>
        
        <div className="my-4">
          {/* {
            data &&
            data.map((item, i) => {
              // console.log(item);

              return (
                <p key={i}>{item.brand}</p>
              )
            })
          } */}

          
          
          <Item />
          <div className="h-[400px]"> 
            <img 
             src="https://i.pinimg.com/originals/b0/f3/40/b0f3404f2e2f354ca713dd3bde1a3ada.gif" 
             alt="" className='h-[90%]' />
           </div>
          {/* <div className="h-[400px]"> 
            <img 
             src="https://media4.giphy.com/media/hpAJyj5DseG35NeNGP/giphy.gif?cid=6c09b9523lq5qhsqdza48rm5maz1fwvagd58m6n1hljvzxan&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s" 
             alt=""  />
           </div> */}

          
        </div>
        <div className="flex flex-col">
          <h6 className="text-blue-700 font-bold">Kosmetika Məlumatları</h6>
          <ul className="flex flex-col space-y-2">
            <li>Burun və qulaqlara qulluq</li>
            <li>Üzdəki tükləri tökən maska</li>
            <li>Mat pomadaların istifadə qaydası</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cosmetics;
