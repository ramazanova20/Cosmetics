import React from 'react'
import Item from './Item'

function MainBasic() {
  return (
    <div className='container lg:max-w-[1024px] mx-auto p-3'>
      <div >
        Kosmetika məhsulları, kosmetik vasitələr
      </div>
      <div className="my-4">
          <Item/>
        </div>
    </div>
  )
}

export default MainBasic