import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { logout } from '../config/firbase'
import {AppContext} from '../context/AppContext'

const RightSidebar = () => {
  const {chatUser , messages} = useContext(AppContext);
  const [msgImage , setMsgImage] = useState([])

  useEffect(() => {
    let tempVar = [];
    messages.map((msg) => {
      if (msg.image) {
        tempVar.push(msg.image)
      }
    })
    console.log(tempVar)
    setMsgImage(tempVar)
  },[messages])

  return chatUser ? (
    <>
      <div className='text-white bg-[#001030] relative h-[75vh] overflow-y-scroll hide-scrollbar'>
        <div className='pt-16 text-center max-w-[70%] m-auto'>
          <img src={chatUser.userData.avatar} alt='' className='w-28 aspect-[1/1] rounded-full'/>
          <h3 className='flex text-lg items-center justify-center gap-1 mt-1 mb-1 ml-0 mr-0'>{chatUser.userData.name}<img src={assets.green_dot} alt=''/></h3>
          <p className='text-sm opacity-15 font-light'>{chatUser.userData.bio}</p>
        </div>
        <hr className='text-zinc-600 mt-4 mb-4 ml-0 mr-0'/>
        <div className='pl-5 pr-5 text-sm'>
          <p>Media</p>
          <div className='max-h-[180px] overflow-x-scroll grid grid-cols-custom-layout-for-rightsidebar gap-2 mt-2 hide-scrollbar'>
            {
              msgImage.map((url , index) => (
                <img key={index} onClick={() =>window.open(url)} src={url} className='w-16 h-10 rounded cursor-pointer' alt='chat images'/>
              ))
            }
          </div>
        </div>
        <button onClick={() => logout()} className='absolute bottom-5 left-5 bg-blue-500 text-white border-none text-sm cursor-pointer pt-3 pb-3 pl-16 pr-16 rounded-2xl font-normal '>Logout</button>
      </div>
    </>
  )
  : 
  (
    <div className='text-white bg-[#001030] relative h-[75vh] overflow-y-scroll hide-scrollbar'>
      <button className='absolute bottom-5 left-5 bg-blue-500 text-white border-none text-sm cursor-pointer pt-3 pb-3 pl-16 pr-16 rounded-2xl font-normal ' onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default RightSidebar