import React, { useContext, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GrFavorite } from "react-icons/gr";
import { SlBasket } from "react-icons/sl";
import { Cookies } from "react-cookie";
import { BASKET } from "../../context/BasketContext";
import { useDataContext } from "../../context/DataContext";
function Menu() {
  const cook = new Cookies();
  const [show, setShow] = useState(false);
  const [sebet, setSebet] = useState(cook.get("sebet") || [])
  const {count} = useContext(BASKET)
  const { favorites } = useDataContext();

  // console.log(sebet)



  const handleClick = () => {
    setShow(!show);
  };
  // const [favorites, setFavorites] = useState([]);
  return (
    <div className="bg-pink-500">
      <div className="container lg:max-w-[1024px] mx-auto p-2 ">
        <div >
          <div className="flex flex-row items-center justify-start md:hidden gap-2 text-white">
            <div className="text-xl">

              <IoMdMenu onClick={handleClick} />
            </div>
            <div className="text-x">Kosmetika</div>
            <div className="flex flex-row items-center md:hidden gap-4 text-white ml-4">
            <div>
                <Link to="/favorites">
                  <GrFavorite className="text-2xl"/>
                </Link>
                <span className="absolute top-[-10px] right-[-13px] bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              </div>
              <div className="relative">
                <Link to="/basket">
                  <SlBasket className="text-2xl" />
                </Link>
                <span className="absolute top-[-10px] right-[-13px] bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              </div>


            </div>
          </div>


          <div
            style={{
              maxHeight: show ? "500px" : 0
            }}
            className="max-h-0 transition-all duration-500 overflow-hidden rounded shadow">
            <div className="flex flex-col p-2 items-start text-white gap-2">

              <ul className="flex flex-col gap-2">
                <li onClick={handleClick}><Link to={""}>Home Page</Link></li>
                <li onClick={handleClick}><Link to={"/cosmetics"}>Kosmetika</Link></li>
                <li onClick={handleClick}><Link to={"/aksesuar"}>Aksessuar və Moda</Link></li>
                <li onClick={handleClick}><Link to={"/brend"}>Brendlər</Link></li>
                <li onClick={handleClick}><Link to={"/melumat"}>Məlumatlar</Link></li>

              </ul>
            </div>
          </div>

        </div>
        <div className="hidden md:block">
          <div className="flex flex-row items-center justify-start gap-2 text-white">
            <div className="text-2xl">
              <Link to={""}><FaHome /></Link>

            </div>
            <ul className="flex flex-row gap-2 items-center pt-4">
              <li><Link to={"/cosmetics"}>Kosmetika</Link></li>
              <li><Link to={"/aksesuar"}>Aksessuar və Moda</Link></li>
              <li><Link to={"/brend"}>Brendlər</Link></li>
              <li><Link to={"/melumat"}>Məlumatlar</Link></li>
            </ul>
            <div className="flex flex-row items-center gap-2 text-white ml-4">
              <div>
                <Link to="/favorites">
                  <GrFavorite className="text-2xl"/>
                </Link>
                <span className="absolute top-[-10px] right-[-13px] bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.length}
                </span>
              </div>
              <div className="relative">
                <Link to="/basket">
                  <SlBasket className="text-2xl" />
                </Link>
                <span className="absolute top-[-10px] right-[-13px] bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
