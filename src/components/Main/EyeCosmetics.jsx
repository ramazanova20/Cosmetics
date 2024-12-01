import React from 'react'
import Item from './Item'


function EyeCosmetics() {
  return (
    <div  className='container lg:max-w-[1024px] mx-auto p-3'>
      
      <div>
        GÖZ üçün Kosmetika
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
         
        <Item category="eye" />
      </div>
    </div>
  )
}

export default EyeCosmetics