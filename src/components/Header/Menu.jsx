import React from 'react'
import { IoMdMenu } from "react-icons/io";
import { FaHome } from "react-icons/fa";

function Menu() {
  return (
    <div className='bg-pink-500'>
        <div className='container lg:max-w-[1024px] mx-auto p-3'>
            <div className='flex items-center justify-start md:hidden gap-2'>
                <div className='text-xl'>
                    <IoMdMenu />
                </div>
                <div className='text-xl'>
                    Kosmetika
                </div>
            </div>
            <div className=' hidden md:block'>
                <div className='flex flex-row items-center justify-start gap-4 text-white'>
                    <div>
                        <FaHome />
                    </div>
                    <ul className='flex flex-row gap-4'>
                        <li>Kosmetika</li>
                        <li>Baxım</li>
                        <li>Aksessuar və Moda</li>
                        <li>Brendlər</li>
                        <li>Məlumatlar</li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Menu