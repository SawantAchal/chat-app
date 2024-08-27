import React from 'react'
import assets from '../assets/assets'
const LeftSidebar = () => {
  return (
    <aside className='bg-[#001030] text-white h-[75vh]'>
        <div className='p-5'>
            <div className='flex justify-between items-center'>
                <img src={assets.logo} alt='logo' className='max-w-[140px] '/>
                <div className='relative pt-3 pb-3 pl-0 pr-0 group'>
                    <img src={assets.menu_icon} alt='' className='max-h-5 cursor-pointer opacity-60 hover:group'/>
                    <div className='absolute top-[100%] right-0 w-32 p-5 rounded bg-white text-black hidden group-hover:block'>
                        <p>Edit Profile</p>
                        <hr className='border-none h-1 bg-slate-300 mt-2 mb-2 ml-0 mr-0'/>
                        <p className='cursor-pointer text-sm '>Logout</p>
                    </div>
                </div>
            </div>
            <div className='bg-[#002670] flex items-center gap-3 pt-2 pb-2 pl-3 pr-3 mt-5'>
                <img src={assets.search_icon} alt='search' className='w-4'/>
                <input type='text'placeholder='Search here' className='bg-transparent border-none outline-none text-white text-xs'/>
            </div>
        </div>
        <div className='flex flex-col h-[70%] overflow-y-scroll hide-scrollbar'>
            {
                Array(12).fill("").map((item , index) => (
                    <div key={index} className='flex gap-2 items-center pt-3 pb-3 pl-5 pr-5 text-sm cursor-pointer hover:bg-blue-500'>
                        <img src={assets.profile_img} alt='profile' className='w-9 aspect-[1/1] rounded-full'/>
                        <div className='flex flex-col'>
                            <p>Achal Sawant</p>
                            <span className='text-gray-500 text-sm hover:text-white'>Hello , hii</span>
                        </div>
                    </div>
                ))
            }
        </div>
    </aside>
  )
}

export default LeftSidebar