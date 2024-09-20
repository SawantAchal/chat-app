import React, { useContext, useEffect, useState } from 'react'
import LeftSidebar from '../components/LeftSidebar'
import ChatBox from '../components/ChatBox'
import RightSidebar from '../components/RightSidebar'
import { AppContext } from '../context/AppContext'

const ChatPage = () => {
  const {chatData , userData ,chatVisible} = useContext(AppContext)
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
        <div className={`w-[95%] h-[75vh] max-w-[1000px] bg-slate-300 grid ${chatVisible ? 'grid-cols-1 md:grid-cols-custom-layout-for-chatPage' : 'grid-cols-[1fr] md:grid-cols-custom-layout-for-chatPage'}`}>
          <LeftSidebar />
          {/* ChatBox takes full width on mobile when chat is visible */}
          <ChatBox />
          {/* RightSidebar is hidden on mobile and visible from md (medium) screens */}
          <div className='hidden md:block'>
            <RightSidebar />
          </div>
        </div>
      }
    </main>
  )
}

export default ChatPage