import React, { useState } from 'react'
import assets from '../assets/assets'

const ProfileUpdate = () => {
  const [image , setImage] = useState(false)
  return (
    <>
      <div  className='min-h-[100vh] bg-no-repeat bg-cover flex items-center justify-center' style={{backgroundImage:`url(/background.png)`}}>
        <div  className='bg-white flex items-center justify-between min-w-[700px] rounded-xl '>
          <form  className='flex flex-col gap-5 p-10'>
            <h3 className='font-medium '>Profile Details</h3>
            <label className='flex items-center gap-3 text-gray-500 cursor-pointer'>
              <input onChange={(e) => setImage(e.target.files[0])} type='file' id='avatar' accept='.png, .jpeg , .jpg' hidden className='p-3 min-w-[300px] border border-solid border-[#c9c9c9] outline-blue-400'/>
              <img src={image? URL.createObjectURL(image) : assets.avatar_icon} alt='' className='w-12 aspect-[1/1] rounded-3xl'/>
              Upload profile image
            </label>
            <input type='text' placeholder='Your name' required  className='p-3 min-w-[300px] border border-solid border-[#c9c9c9] outline-blue-400'/>
            <textarea placeholder='write profile bio' required className='p-3 min-w-[300px] border border-solid border-[#c9c9c9] outline-blue-400'/>
            <button type='submit' className='border-none text-white cursor-pointer bg-blue-500 p-2 text-sm '>Save</button>
          </form>
          <img src={image? URL.createObjectURL(image) : assets.logo_icon} alt='' className='max-w-[160px] aspect-[1/1] mt-5 mb-5   rounded-full '/>
        </div>
      </div>
    </>
  )
}

export default ProfileUpdate