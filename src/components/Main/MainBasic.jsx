import React from 'react'
import Item from './Item'

import JewelryItem from './JewelryItem'
// import Breadcrumb from './Breadcrumb'

function MainBasic() {
  return (
    <div className='container lg:max-w-[1024px] mx-auto p-3'>
      {/* <Breadcrumb/> */}
      <div >
        Kosmetika məhsulları, kosmetik vasitələr
      </div>
      <div className="my-4">
          
          uz ucun
          <Item category="foundation" />
      </div>
      <div className="my-4">
          
          goz ucun
          <Item category="eye" />
      </div>
      <div className="my-4">
          
          dodaq ucun
          <Item category="lip" />
      </div>
      <div className="my-4">
          Aksesuar ucun
         <JewelryItem/>
      </div>
    </div>
  )
}

export default MainBasic