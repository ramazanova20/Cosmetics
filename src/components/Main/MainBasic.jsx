import React from 'react'
// import Item from './Item'
import UzItem from './UzItem'
import EyeItem from './EyeItem'
import LipItem from './LipItem'

function MainBasic() {
  return (
    <div className='container lg:max-w-[1024px] mx-auto p-3'>
      <div >
        Kosmetika məhsulları, kosmetik vasitələr
      </div>
      <div className="my-4">
          {/* <Item/> */}
          uz ucun
         <UzItem/>
      </div>
      <div className="my-4">
          {/* <Item/> */}
          goz ucun
         <EyeItem/>
      </div>
      <div className="my-4">
          {/* <Item/> */}
          dodaq ucun
         <LipItem/>
      </div>
      <div className="my-4">
          {/* <Item/> */}
          Aksesuar ucun
         <LipItem/>
      </div>
    </div>
  )
}

export default MainBasic