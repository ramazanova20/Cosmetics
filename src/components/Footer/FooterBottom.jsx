import React, { Fragment, useState, useEffect } from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from "../../assets/img/logo33.33.png"
import { FcGoogle } from "react-icons/fc";
function FooterBottom() {
  
    const [year, setYear] = useState(new Date().getFullYear());
  
    useEffect(() => {
      setYear(new Date().getFullYear());
    }, []);
  return (
    <div className="bg-[#feb3c3]">
      {/* bg-[#F48FB1] */}
      <div className="container lg:max-w-[1280px] mx-auto p-3">
        
        <div className="flex flex-wrap justify-between text-black gap-6">
          
          <div className="flex flex-col items-start w-full md:w-[48%] lg:w-auto">
            <div className="logo mb-4">
              <img src={logo} alt="Logo" className='max-w-[220px]'/>
            </div>
            <div className="flex flex-row gap-3">
              <a href="https://www.instagram.com/kosmetika_aksessuar" target="_blank" className="p-1 text-sky-700 text-xl">
                <FaFacebookSquare className='transition-transform duration-300 hover:scale-150 cursor-pointer' />
              </a>
              <a href="https://www.instagram.com/kosmetika_aksessuar" target="_blank" className="p-1 text-[#DE1772] text-xl">
                <FaInstagram className='transition-transform duration-300 hover:scale-150 cursor-pointer'/>
              </a>
              <a href="https://www.instagram.com/kosmetika_aksessuar" target="_blank" className="p-1 text-xl">
                <FcGoogle className='transition-transform duration-300 hover:scale-150 cursor-pointer'/>
              </a>
            </div>
          </div>

         
          <div className="flex flex-col items-start w-full md:w-[48%] lg:w-auto">
            <h6 className="mb-4 font-bold">Kategoriyalar</h6>
            <ul className="flex flex-col gap-2">
              <div className="relative group inline-block">
                <span className="absolute inset-0 bg-emerald-100 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative text-green-900 ">
                <Link to="/cosmetics">Kosmetika</Link>
                </span>
              </div>
              <div className="relative group inline-block">
                <span className="absolute inset-0 bg-emerald-100 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative text-green-900 ">
                <Link to="/aksesuar">Aksessuar və Moda</Link>
                </span>
              </div>
              <div className="relative group inline-block">
                <span className="absolute inset-0 bg-emerald-100 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative text-green-900 ">
                  <Link to={"/melumat"}>Məlumatlar</Link>
                </span>
              </div>
              <div className="relative group inline-block">
                <span className="absolute inset-0 bg-emerald-100 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative text-green-900 ">
                <Link to="/brend">Brendlər</Link>
                </span>
              </div>
              <div className="relative group inline-block">
                <span className="absolute inset-0 bg-emerald-100 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative text-green-900 ">
                  <Link to={"/melumat"}>Məlumatlar</Link>
                </span>
              </div>
            </ul>
          </div>

          
          <div className="flex flex-col items-start w-full md:w-[48%] lg:w-auto">
            <h6 className="mb-4 font-bold">Məlumatlar</h6>
            <div className="relative group inline-block">
              <span className="absolute inset-0 bg-emerald-100 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative text-green-900 ">
                <Link to={"/melumat"}>Məlumatlar</Link>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start w-full md:w-[48%] lg:w-auto">
            <Fragment>
      <div className="pt-lg-10 pt-5 footer">
        <h6>{`© ${year}. GR.`}</h6>
      </div>
    </Fragment>
        
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterBottom;
