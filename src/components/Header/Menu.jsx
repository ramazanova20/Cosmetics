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
    <div className="bg-pink-500 overflow-x-hidden">
      <div className="container lg:max-w-[1024px] mx-auto p-2">
        <div>
          {/* Mobile Menu */}
          <div className="flex flex-row items-center justify-between md:hidden gap-2 text-white">
            <div className="text-xl">
              <IoMdMenu onClick={handleClick} />
            </div>
            <div className="text-lg font-bold">Kosmetika</div>
            <div className="flex flex-row items-center gap-4 text-white relative">
              <div className="relative">
                <Link to="/favorites">
                  <GrFavorite className="text-xl sm:text-2xl" />
                </Link>
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-black text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              </div>
              <div className="relative">
                <Link to="/basket">
                  <SlBasket className="text-xl sm:text-2xl" />
                </Link>
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-black text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {count}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown */}
          <div
            style={{
              maxHeight: show ? "500px" : 0,
            }}
            className="max-h-0 transition-all duration-500 overflow-hidden rounded shadow bg-pink-600"
          >
            <div className="flex flex-col p-2 text-white">
              <ul className="flex flex-col gap-2">
                <li onClick={handleClick}>
                  <Link to={""} className="text-sm">
                    Home Page
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link to={"/cosmetics"} className="text-sm">
                    Kosmetika
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link to={"/aksesuar"} className="text-sm">
                    Aksessuar və Moda
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link to={"/brend"} className="text-sm">
                    Brendlər
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link to={"/melumat"} className="text-sm">
                    Məlumatlar
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:flex-row items-center justify-between text-white">
            <div className="text-2xl">
              <Link to={""}>
                <FaHome />
              </Link>
            </div>
            <ul className="flex flex-row gap-4 items-center my-4">
              <li>
                <Link to={"/cosmetics"}>Kosmetika</Link>
              </li>
              <li>
                <Link to={"/aksesuar"}>Aksessuar və Moda</Link>
              </li>
              <li>
                <Link to={"/brend"}>Brendlər</Link>
              </li>
              <li>
                <Link to={"/melumat"}>Məlumatlar</Link>
              </li>
            </ul>
            <div className="flex flex-row items-center gap-4">
              <div className="relative">
                <Link to="/favorites">
                  <GrFavorite className="text-2xl" />
                </Link>
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              </div>
              <div className="relative">
                <Link to="/basket">
                  <SlBasket className="text-2xl" />
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
