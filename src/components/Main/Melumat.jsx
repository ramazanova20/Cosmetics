import React from 'react'
import Item from './Item'

function Melumat() {
  return (
    <div  className='container lg:max-w-[1024px] mx-auto p-3'>
      <div>
         Kosmetika məlumatları
      </div>
      <div className="my-4">
          <Item/>
        </div>
    </div>
  )
}

export default Melumat