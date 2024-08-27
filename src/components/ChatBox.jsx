import React from 'react'
import assets from '../assets/assets'

const ChatBox = () => {
  return (
    <main className='h-[75vh] relative bg-[#f1f5ff]'>
        <div className='pt-3 pb-3 pl-4 pr-4 gap-3 flex items-center border-b-2 border-solid border-[#c6c6c6]'>
            <img src={assets.profile_img} alt='profile' className='w-9 rounded-full aspect-[1/1]'/>
            <p className='flex items-center flex-1 font-medium text-lg text-gray-700 gap-1'>Achal Sawant <img src={assets.green_dot} alt='' className='w-3'/></p>
            <img src={assets.help_icon} alt='help' className='w-5'/>
        </div>
        <div className='h-[calc(100%-70px)] pb-12 overflow-y-scroll hide-scrollbar flex flex-col-reverse'>
            {/* sender */}
            <div className='flex items-center justify-end gap-1 pt-0 pb-0 pl-4 pr-4'>
                <p className='text-white bg-blue-600 p-2 max-w-[200px] text-sm font-light mb-8 rounded-s-lg rounded-tr-lg'>Lorem ipsum dolor sit amet consectetur...</p>
                <div className=''>
                    <img src={assets.profile_img}  className='w-7 aspect-[1/1] rounded-md'/>
                    <p className='text-center text-[9px]'>2:30pm</p>
                </div>
            </div>
            {/* for image */}
            <div className='flex items-center justify-end gap-1 pt-0 pb-0 pl-4 pr-4'>
                <img src={assets.pic1} alt='' className='max-w-[230px] mb-3 rounded-lg'/>
                <div className=''>
                    <img src={assets.profile_img}  className='w-7 aspect-[1/1] rounded-md'/>
                    <p className='text-center text-[9px]'>2:30pm</p>
                </div>
            </div>
            {/* receiver */}
            <div className='flex flex-row-reverse items-center justify-end gap-1 pt-0 pb-0 pl-4 pr-4'>
                <p className='text-white bg-blue-600 p-2 max-w-[200px] text-sm font-light mb-8 rounded-e-lg rounded-t-lg'>Lorem ipsum dolor sit amet consectetur...</p>
                <div>
                    <img src={assets.profile_img} className='w-7 aspect-[1/1] rounded-md'/>
                    <p className='text-center text-[9px]'>2:30pm</p>
                </div>
            </div>
        </div>
        <div className='flex items-center gap-3 pt-3 pb-3 pl-4 pr-4 bg-white absolute bottom-0 left-0 right-0 '>
            <input type='text' placeholder='Send a message' className='flex-1 border-none outline-none'/>
            <input type='file' id='image' accept='image/png , image/jpeg' hidden className='w-7 cursor-pointer'/>
            <label htmlFor='image' className='flex '>
                <img src={assets.gallery_icon} alt='' className='w-6 cursor-pointer '/>
            </label>
            <img src={assets.send_button} alt='send' className='w-7 cursor-pointer' />
        </div>
    </main>
  )
}

export default ChatBox