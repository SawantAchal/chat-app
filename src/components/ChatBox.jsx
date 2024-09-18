import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useEffect } from 'react'
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from 'firebase/firestore'
import { db } from '../config/firbase'
import { toast } from 'react-toastify'
import upload from '../lib/upload.js'

const ChatBox = () => {
    const {messages , setMessages ,chatUser , setChatUser,messagesId , setMessagesId , userData} = useContext(AppContext)
    const [input , setInput ] = useState('')

    const sendMessage = async () => {
        try {
            if (input && messagesId) {
                await updateDoc(doc(db , 'messages' , messagesId),{
                    messages:arrayUnion({
                        sId:userData.id,
                        text:input,
                        createdAt:new Date()
                    })
                })
                const userIDs = [chatUser.rId, userData.id];
                userIDs.forEach(async(id) =>{
                    const userChatsRef = doc(db ,'chats' , id)
                    const userChatsSnapshot = await getDoc(userChatsRef)
                    if (userChatsSnapshot.exists()) {
                        const userChatData = userChatsSnapshot.data();
                        const chatIndex = userChatData.chatsData.findIndex((c)=>c.messageId === messagesId)
                        //for last message
                        userChatData.chatsData[chatIndex].lastMessage = input.slice(0,30)
                        // to update time of the last message
                        userChatData.chatsData[chatIndex].updatedAt = Date.now()
                        if (userChatData.chatsData[chatIndex].rId === userData.id) {
                            userChatData.chatsData[chatIndex].messageSeen = false;
                        }
                        await updateDoc(userChatsRef,{
                            chatsData:userChatData.chatsData
                        })
                    }
                })
            }
        } catch (error) {
            toast.error(error.message)
        }
        setInput('')
    }


    
    //to display the mesg using id and store that msg in unsub
    useEffect(() => {
        if (messagesId) {
            const unSub = onSnapshot(doc(db,'messages' , messagesId) ,(res) => {
                setMessages(res.data().messages.reverse())
                console.log('mesggaes' ,res.data().messages.reverse())
            })
            return() => {
                unSub();
            }
        }
    },[messagesId])

    //to convert time stamp
    const covertTimestamp = (timestamp) => {
        let date = timestamp.toDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        if (hour > 12) {
            return hour - 12  + ":" + minute + 'PM'
        }else{
            return hour + ":" + minute + 'AM'
        }
    }

    
    //sent image function 
    const sendImage = async(e) => {
        try {
            //upload image and get url
            const fileURL = await upload(e.target.files[0])
            if (fileURL && messagesId) {
                await updateDoc(doc(db , 'messages' , messagesId),{
                    messages:arrayUnion({
                        sId:userData.id,
                        image:fileURL,
                        createdAt:new Date()
                    })
                })
                const userIDs = [chatUser.rId, userData.id];
                userIDs.forEach(async(id) =>{
                    const userChatsRef = doc(db ,'chats' , id)
                    const userChatsSnapshot = await getDoc(userChatsRef)
                    if (userChatsSnapshot.exists()) {
                        const userChatData = userChatsSnapshot.data();
                        const chatIndex = userChatData.chatsData.findIndex((c)=>c.messageId === messagesId)
                        //for last message
                        userChatData.chatsData[chatIndex].lastMessage ="Image"
                        // to update time of the last message
                        userChatData.chatsData[chatIndex].updatedAt = Date.now()
                        if (userChatData.chatsData[chatIndex].rId === userData.id) {
                            userChatData.chatsData[chatIndex].messageSeen = false;
                        }
                        await updateDoc(userChatsRef,{
                            chatsData:userChatData.chatsData
                        })
                    }
                })
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


  return chatUser ?  (
    <main className='h-[75vh] relative bg-[#f1f5ff]'>
        <div className='pt-3 pb-3 pl-4 pr-4 gap-3 flex items-center border-b-2 border-solid border-[#c6c6c6]'>
            <img src={chatUser.userData.avatar} alt='profile' className='w-9 rounded-full aspect-[1/1]'/>
            <p className='flex items-center flex-1 font-medium text-lg text-gray-700 gap-1'>{chatUser.userData.name} <img src={assets.green_dot} alt='' className='w-3'/></p>
            <img src={assets.help_icon} alt='help' className='w-5'/>
        </div>
        <div className='h-[calc(100%-70px)] pb-12 overflow-y-scroll hide-scrollbar flex flex-col-reverse'>
            {/* sender */}
            {
                messages.map((msg,index)=>(
                    <div key={index} className={`${msg.sId === userData.id ? 'flex items-center justify-end gap-1 pt-0 pb-0 pl-4 pr-4 ': 'flex flex-row-reverse items-center justify-end gap-1 pt-0 pb-0 pl-4 pr-4'}  `}>
                        {
                            msg['image']
                                ? <img className='max-w-[230px] mb-3 rounded-lg' src={msg.image} alt='sent image'/>
                                :<p className='text-white bg-blue-600 p-2 max-w-[200px] text-sm font-light mb-8 rounded-s-lg rounded-tr-lg'>{msg.text}</p>
                        }
                        <div className=''>
                            <img src={msg.sId === userData.id ? userData.avatar : chatUser.userData.avatar}  className='w-7 aspect-[1/1] rounded-md'/>
                            <p className='text-center text-[9px]'>{covertTimestamp(msg.createdAt)}</p>
                        </div>
                    </div>
                ))
            }

            {/* for image
            <div className='flex items-center justify-end gap-1 pt-0 pb-0 pl-4 pr-4'>
                <img src={assets.pic1} alt='' className='max-w-[230px] mb-3 rounded-lg'/>
                <div className=''>
                    <img src={assets.profile_img}  className='w-7 aspect-[1/1] rounded-md'/>
                    <p className='text-center text-[9px]'>2:30pm</p>
                </div>
            </div> */}
            {/* receiver */}
            {/* <div className='flex flex-row-reverse items-center justify-end gap-1 pt-0 pb-0 pl-4 pr-4'>
                <p className='text-white bg-blue-600 p-2 max-w-[200px] text-sm font-light mb-8 rounded-e-lg rounded-t-lg'>Lorem ipsum dolor sit amet consectetur...</p>
                <div>
                    <img src={assets.profile_img} className='w-7 aspect-[1/1] rounded-md'/>
                    <p className='text-center text-[9px]'>2:30pm</p>
                </div>
            </div> */}
        </div>
        <div className='flex items-center gap-3 pt-3 pb-3 pl-4 pr-4 bg-white absolute bottom-0 left-0 right-0 '>
            <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Send a message' className='flex-1 border-none outline-none'/>
            <input onChange={sendImage} type='file' id='image' accept='image/png , image/jpeg' hidden className='w-7 cursor-pointer'/>
            <label htmlFor='image' className='flex '>
                <img src={assets.gallery_icon} alt='' className='w-6 cursor-pointer '/>
            </label>
            <img onClick={sendMessage} src={assets.send_button} alt='send' className='w-7 cursor-pointer' />
        </div>
    </main>
  )
  :
    <div className='w-full flex flex-col items-center justify-center gap-1'>
        <img src={assets.logo_icon} alt='' className='w-16'/>
        <p className='text-2xl font-medium text-gray-600'>Chat anytime , anywhere</p>
    </div>
}

export default ChatBox