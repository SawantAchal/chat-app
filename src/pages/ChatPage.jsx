import React, { useContext, useEffect, useState } from 'react'
import LeftSidebar from '../components/LeftSidebar'
import ChatBox from '../components/ChatBox'
import RightSidebar from '../components/RightSidebar'
import { AppContext } from '../context/AppContext'

const ChatPage = () => {
  const {chatData , userData} = useContext(AppContext)
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    if (chatData && userData) {
      setLoading(false)
    }
  })

  return (
    <main className='min-h-[100vh] bg-gradient-to-r from-sky-600 to-violet-700 grid place-items-center'>
      {
        loading ? <p className='text-3xl text-white'> Loading...</p>
        :
        <div className='w-[95%] h-[75vh] max-w-[1000px] bg-slate-300 grid grid-cols-custom-layout-for-chatPage'>
          <LeftSidebar/>
          <ChatBox/>
          <RightSidebar/>
        </div>
      }
    </main>
  )
}

export default ChatPage