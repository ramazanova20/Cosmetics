import React from 'react';
import Item from './Item';
import { Link } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

function Cosmetics() {
  return (
    <div>
      <div className="container lg:max-w-[1024px] mx-auto p-3">
        {/* <Breadcrumb/> */}
        <div>
          <h6>Kosmetika</h6>
          <ul className="flex flex-col md:flex-row gap-4">
            <li><Link to ={"/uzcosmetics"}>ÜZ üçün Kosmetika</Link></li>
            <li><Link to ={"/eyecosmetics"}>GÖZ üçün Kosmetika</Link></li>
            <li><Link to ={"/lipcosmetics"}>DODAQ üçün Kosmetika</Link></li>
            <li><Link to ={"/aksesuar"}>Aksessuarlar</Link></li>
        
          </ul>
        </div>
        <div className="bg-slate-400 my-4">
          <div>
            Sirlama:
            <select name="sorting" id="sorting">
              <option value="latest">Son Məhsullar</option>
              <option value="high-to-low">Bahadan Ucuza</option>
              <option value="low-to-high">Ucuzdan Bahaya</option>
            </select>
          </div>
        </div>
        <div className="my-4">
          <Item />
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
