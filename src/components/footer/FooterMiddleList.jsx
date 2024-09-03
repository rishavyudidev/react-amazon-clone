import React from 'react'

const FooterMiddleList = (props) => {
  return (
    <div className='w-full'>
    <h3 className='font-titleFont text-white text-base font-semibold mb-3'>
      {props.title}
    </h3>
    <ul className='flex flex-col gap-2 font-bodyFont'>
      {
        props.listItem.map((item)=>item.listData.map((data,i)=>(
            <li key={i} className='footerLink'>{data}</li>
        )))
      }
    </ul>
    </div>
  )
}

export default FooterMiddleList