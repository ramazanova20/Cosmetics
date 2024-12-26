import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';

function FooterBottom() {
  return (
    <div className="bg-stone-800">
      <div className="container lg:max-w-[1280px] mx-auto p-3">
        
        <div className="flex flex-wrap justify-between text-white gap-6">
          
          <div className="flex flex-col items-start w-full md:w-[48%] lg:w-auto">
            <div className="logo mb-4">
              <img src="./src/assets/img/logos2.png" alt="Logo" />
            </div>
            <div className="flex flex-row gap-3">
              <div className="p-1 text-sky-700 text-xl">
                <FaFacebookSquare />
              </div>
              <div className="p-1 text-[#DE1772] text-xl">
                <FaInstagram />
              </div>
            </div>
          </div>

         
          <div className="flex flex-col items-start w-full md:w-[48%] lg:w-auto">
            <h6 className="mb-4">Kategoriyalar</h6>
            <ul className="flex flex-col gap-2">
              <Link to="/cosmetics">Kosmetika</Link>
              <Link to="/aksesuar">Aksessuar və Moda</Link>
              <Link to="/brend">Brendlər</Link>
              <Link to="/melumat">Məlumatlar</Link>
            </ul>
          </div>

          
          <div className="flex flex-col items-start w-full md:w-[48%] lg:w-auto">
            <h6 className="mb-4">Məlumatlar</h6>
            <p className="mb-4">Məlumatlar</p>
          </div>

          <div className="flex flex-col items-start w-full md:w-[48%] lg:w-auto">
            <h6 className="mb-4">© 2015 Kosmetika.az</h6>
            <h6>Email: info [@] Kosmetika.az</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterBottom;
