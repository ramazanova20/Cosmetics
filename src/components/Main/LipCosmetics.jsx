import React from 'react'
import LipItem from './LipItem'

function LipCosmetics() {
  return (
    <div  className='container lg:max-w-[1024px] mx-auto p-3'>
      <div>
        Dodaq üçün Kosmetika
      </div>
      <div className="my-4">
          <LipItem/>
        </div>
    </div>
  )
}

export default LipCosmetics