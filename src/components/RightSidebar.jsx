import React from 'react'
import assets from '../assets/assets'
import { logout } from '../config/firbase'

const RightSidebar = () => {
  return (
    <>
      <div className='text-white bg-[#001030] relative h-[75vh] overflow-y-scroll hide-scrollbar'>
        <div className='pt-16 text-center max-w-[70%] m-auto'>
          <img src={assets.profile_img} alt='' className='w-28 aspect-[1/1] rounded-full'/>
          <h3 className='flex text-lg items-center justify-center gap-1 mt-1 mb-1 ml-0 mr-0'>Achal Sawant<img src={assets.green_dot} alt=''/></h3>
          <p className='text-sm opacity-15 font-light'>Lorem ipsum dolor sit amet</p>
        </div>
        <hr className='text-zinc-600 mt-4 mb-4 ml-0 mr-0'/>
        <div className='pl-5 pr-5 text-sm'>
          <p>Media</p>
          <div className='max-h-[180px] overflow-x-scroll grid grid-cols-custom-layout-for-rightsidebar gap-1 mt-2 hide-scrollbar'>
            <img src={assets.pic1} alt='' className='w-16 rounded cursor-pointer'/>
            <img src={assets.pic2} alt='' className='w-16 rounded cursor-pointer'/>
            <img src={assets.pic3} alt='' className='w-16 rounded cursor-pointer'/>
            <img src={assets.pic4} alt='' className='w-16 rounded cursor-pointer'/>
            <img src={assets.pic3} alt='' className='w-16 rounded cursor-pointer'/>
            <img src={assets.pic1} alt='' className='w-16 rounded cursor-pointer'/>
          </div>
        </div>
        <button onClick={() => logout()} className='absolute bottom-5 left-5 bg-blue-500 text-white border-none text-sm cursor-pointer pt-3 pb-3 pl-16 pr-16 rounded-2xl font-normal '>Logout</button>
      </div>
    </>
  )
}

export default RightSidebar