import React, { useContext, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";
import { SlBasket } from "react-icons/sl";
import { Cookies } from "react-cookie";
import { BASKET } from "../../context/BasketContext";
import { DATA, useDataContext } from "../../context/DataContext";

function Menu() {
  const cook = new Cookies();
  const [show, setShow] = useState(false);
  const [sebet, setSebet] = useState(cook.get("sebet") || []);
  const { count } = useContext(BASKET);
  const { favorites } = useDataContext();

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="bg-[#FF849E] overflow-x-hidden">
      {/* bg-[#E57373] */}
      <div className="container lg:max-w-[1280px] mx-auto p-2">
        <div className="flex flex-col items-center justify-between">
          {/* Mobile Menu */}
          <div className="flex flex-row items-center justify-between md:hidden gap-2 text-white">
            <div className="text-2xl">
              <IoMdMenu onClick={handleClick} className="transition-transform duration-300 hover:scale-150"/>
            </div>
            <div className="text-lg font-bold">Cosmetics</div>
            <div className="flex flex-row items-center gap-4 text-white relative">
              <div className="relative">
                <Link to="/favorites">
                  <GrFavorite className="text-xl sm:text-2xl transition-transform duration-300 hover:scale-150" />
                </Link>
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-black text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              </div>
              <div className="relative">
                <Link to="/basket">
                  <SlBasket className="text-xl sm:text-2xl transition-transform duration-300 hover:scale-150" />
                </Link>
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-black text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {count}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown */}
          <div
             className={`overflow-hidden transition-all duration-500 ease-out ${show ? "max-h-96" : "max-h-0"}`}
          >
            <div className="flex flex-col p-2 text-white">
              <ul className="flex flex-col gap-3">
                <li onClick={handleClick}>
                <div className="relative group inline-block">
                <span className="absolute inset-0 bg-yellow-400 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center text-white text-lg">
                <Link to={""} className="text-sm">
                    Home Page
                  </Link>
                </span>
              </div>
                </li>
                <li onClick={handleClick}>
                <div className="relative group inline-block">
                <span className="absolute inset-0 bg-yellow-400 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center text-white text-lg">
                <Link to={"/cosmetics"} className="text-sm">
                    Cosmetics
                  </Link>
                </span>
              </div>
                </li>
                <li onClick={handleClick}>
                <div className="relative group inline-block">
                <span className="absolute inset-0 bg-yellow-400 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center text-white text-lg">
                <Link to={"/aksesuar"} className="text-sm">
                    Accessories and Fashion
                  </Link>
                </span>
              </div>
                </li>
                <li onClick={handleClick}>
                <div className="relative group inline-block">
                <span className="absolute inset-0 bg-yellow-400 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center text-white text-lg">
                <Link to={"/brend"} className="text-sm">
                    Brands
                  </Link>
                </span>
              </div>
                </li>
                <li onClick={handleClick}>
                <div className="relative group inline-block">
                <span className="absolute inset-0 bg-yellow-400 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center text-white text-lg">
                <Link to={"/melumat"} className="text-sm">
                    Information
                  </Link>
                </span>
              </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:flex-row items-center justify-between text-white">
            <div className="text-2xl mr-2">
              <Link to={""}>
                <FaHome className="transition-transform duration-300 hover:scale-150" />
              </Link>
            </div>
            <ul className="flex flex-row gap-20 lg:gap-40 xl:gap-56 items-center my-4">
            <li>
              <div className="relative group inline-block">
                <span className="absolute inset-0 bg-yellow-400 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center text-white text-lg">
                  <Link to={"/cosmetics"}>Kosmetika</Link>
                </span>
              </div>
            </li>
              <li className="whitespace-nowrap">
              <div className="relative group inline-block">
                <span className="absolute inset-0 bg-yellow-400 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center text-white text-lg">
                  <Link to={"/aksesuar"}>Aksessuar və Moda</Link>
                </span>
              </div>
              </li>
              <li>
              <div className="relative group inline-block">
                <span className="absolute inset-0 bg-yellow-400 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center text-white text-lg">
                <Link to={"/brend"}>Brendlər</Link>
                </span>
              </div> 
              </li>
              <li>
              <div className="relative group inline-block">
                <span className="absolute inset-0 bg-yellow-400 opacity-10 blur-lg rounded group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center text-white text-lg">
                  <Link to={"/melumat"}>Məlumatlar</Link>
                </span>
              </div>
              </li>
            </ul>
            <div className="flex flex-row items-center gap-4 ml-2">
              <div className="relative">
                <Link to="/favorites">
                  <GrFavorite className="text-2xl transition-transform duration-300 hover:scale-150" />
                </Link>
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              </div>
              <div className="relative">
                <Link to="/basket">
                  <SlBasket className="text-2xl transition-transform duration-300 hover:scale-150" />
                </Link>
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
