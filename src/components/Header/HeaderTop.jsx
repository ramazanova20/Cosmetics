import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

function HeaderTop() {
    
  return (
    <div>
        <div className='container lg:max-w-[1024px] mx-auto p-3'>
            <div className='flex-col gap-4'>
                <div className='flex flex-col justify-start sm:flex-row sm:justify-between sm:items-center gap-4'>
                    <div className='logo'>
                        <img src="./src/assets/img/logos.png" alt="" />
                    </div>
                    <div className='min-w-14 hidden lg:block'>
                    <form action="">
                        <div className='flex min-w-14'>
                            <input type="text" className='border p-1 rounded-l-md' placeholder='Axtar...'/>
                            <div className='p-2 bg-black text-white  rounded-r-md flex items-center justify-center'><IoSearch /></div>
                        </div>
                    </form>
                    </div>
                    <div className='flex'>
                        <div className='flex mr-3 text-center justify-between items-center'>
                            <div className='p-1 text-[#DE1772] text-xl'><FaInstagram/></div>
                            <p className='text-xl font-normal'>Instagram</p>
                        </div>
                        <div className='flex text-center justify-between items-center'>
                            <div className='p-1 text-xl'><FaPhoneAlt/></div>
                            <p className='text-xl font-normal'>Bizimlə Əlaqə</p>
                        </div>
                    </div>
                </div>
                <div className=' flex-grow items-center justify-center lg:hidden mt-4'>
                    <form action="">
                        <div className='flex'>
                            <input type="text" className='border flex-grow p-1 rounded-l-md' placeholder='Axtar...'/>
                            <div className='p-2 bg-black text-white  rounded-r-md flex items-center justify-center'><IoSearch /></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeaderTop