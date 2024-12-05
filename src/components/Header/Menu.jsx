import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Menu() {
  const [show, setShow] = useState(false); 
  const handleClick = () => {
    // document.querySelector('#bgone').style.display="none"
    setShow(!show); 
  };
//   const handleclose = () => {}

  return (
    <div className="bg-pink-500">
      <div className="container lg:max-w-[1024px] mx-auto p-3">
       
        <div className="flex items-center justify-start md:hidden gap-2 text-white">
          <div className="text-xl">
         
            <IoMdMenu onClick={handleClick} />
          </div>
          <div className="text-x">Kosmetika</div>
        </div>

         
          <div
          style={{
            maxHeight: show ? "500px": 0 
          }}
          className="max-h-0 transition-all duration-500 overflow-hidden rounded shadow">
            <div className="flex flex-col p-4 items-start text-white gap-2">
              {/* <div className="cursor-pointer">
                <FaHome  onClick={handleClick}/>
              </div> */}
              <ul className="flex flex-col gap-2">
                <li><Link to ={""}>Home Page</Link></li>
                <li><Link to ={"/cosmetics"}>Kosmetika</Link></li>
                <li><Link to ={"/aksesuar"}>Aksessuar və Moda</Link></li>
                <li><Link to ={"/brend"}>Brendlər</Link></li>
                <li><Link to ={"/melumat"}>Məlumatlar</Link></li>
                
              </ul>
            </div>
          </div>
          

        <div className="hidden md:block">
          <div className="flex flex-row items-center justify-start gap-4 text-white">
            <div>
              <Link to ={""}><FaHome /></Link>
              
            </div>
            <ul className="flex flex-row gap-4">
                <li><Link to ={"/cosmetics"}>Kosmetika</Link></li>
                <li><Link to ={"/aksesuar"}>Aksessuar və Moda</Link></li>
                <li><Link to ={"/brend"}>Brendlər</Link></li>
                <li><Link to ={"/melumat"}>Məlumatlar</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
