import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where ,getDoc} from 'firebase/firestore'
import { db } from '../config/firbase'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const LeftSidebar = () => {
    const navigate = useNavigate()
    const {userData , chatData  , setChatUser , messagesId , setMessagesId ,chatVisible , setChatVisible} = useContext(AppContext)
    const [user , setuser] = useState(null)
    const [showSearch , setShowSearch] = useState(false)


    //logic for user search
    const inputHandler = async(e) => {
        try {
            //get input feild value
            const input = e.target.value;
            if (input) {
                setShowSearch(true)
                //ref of user collection
                const userRef = collection(db,'users')
                //match user name 
                const q = query(userRef,where("username" , "==" , input.toLowerCase()))
                const querySnap = await getDocs(q)
                //check input field is not empty and ensure that input field should not search for own profile 
                if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
                    //once user is added in frd list then ensure that it does not search again
                    let userExits = false
                    chatData.map((user) => {
                        //check the id is same as the search user
                        //if check search id is same as frd
                        if (user.rId === querySnap.docs[0].data().id) {
                            // then we true userExuts variable
                            userExits = true;
                        }
                    })
                    if (!userExits) {
                        console.log("search user data" ,querySnap.docs[0].data())
                        //save search user in setUser
                        setuser(querySnap.docs[0].data())
                    }
                }else{
                    setuser(null)
                }
            }else{
                setShowSearch(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //to save chat of  search user 
    const addChat = async() => {
        //create collection to save user chat and own chat 
        const messageRef = collection(db,"messages")
        const chatRef = collection(db , "chats")
        try {
            const newMessageRef = doc(messageRef);
            await setDoc(newMessageRef , {
                createAt:serverTimestamp(),
                messages:[],
            })
            await updateDoc(doc(chatRef,user.id) ,{
                chatData:arrayUnion({
                    messageId:newMessageRef.id,
                    lastMessage:"",
                    rId:userData.id,
                    updatedAt:Date.now(),
                    messageSeen:true
                })
            })
            await updateDoc(doc(chatRef,userData.id) ,{
                chatData:arrayUnion({
                    messageId:newMessageRef.id,
                    lastMessage:"",
                    rId:user.id,
                    updatedAt:Date.now(),
                    messageSeen:true
                })
            })
        } catch (error) {
            toast.error(error.message)
            console.error(error)
        }
    }

    //on click frd then chat should be open 
    const setChat = async(item) => {
        try {
            console.log(item)
            setMessagesId(item.messageId);
            setChatUser(item)
            if (window.innerWidth < 768) {
                setChatVisible(true);
            }
            //to set color of the last msg is it seen or not
            const userChatsRef = doc(db, 'chats' , userData.id);
            const userChatsSnapshot = await getDoc(userChatsRef)
            const userChatsData = userChatsSnapshot.data()
            const chatIndex = userChatsData.chatsData.findIndex((c)=> c.messageId===item.messageId);
            userChatsData.chatsData[chatIndex].messageSeen=true;
            await updateDoc(userChatsRef , {
                chatsData:userChatsData.chatsData
            })
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <aside className={`bg-[#001030] text-white h-[75vh] ${chatVisible ? 'hidden' : ''}` }>
        <div className='p-5'>
            <div className='flex justify-between items-center'>
                <img src={assets.logo} alt='logo' className='max-w-[140px] '/>
                <div className='relative pt-3 pb-3 pl-0 pr-0 group'>
                    <img src={assets.menu_icon} alt='' className='max-h-5 cursor-pointer opacity-60 hover:group'/>
                    <div className='absolute top-[100%] right-0 w-32 p-5 rounded bg-white text-black hidden group-hover:block'>
                        <p onClick={() => navigate('/profile')}>Edit Profile</p>
                        <hr className='border-none h-1 bg-slate-300 mt-2 mb-2 ml-0 mr-0'/>
                        <p className='cursor-pointer text-sm '>Logout</p>
                    </div>
                </div>
            </div>
            <div className='bg-[#002670] flex items-center gap-3 pt-2 pb-2 pl-3 pr-3 mt-5'>
                <img src={assets.search_icon} alt='search' className='w-4'/>
                <input onChange={inputHandler}  type='text'placeholder='Search here' className='bg-transparent border-none outline-none text-white text-xs'/>
            </div>
        </div>
        <div className='flex flex-col h-[70%] overflow-y-scroll hide-scrollbar'>
            {
                showSearch && user 
                    ?
                        <div onClick={addChat}  className='flex gap-2 items-center pt-3 pb-3 pl-5 pr-5 text-sm cursor-pointer hover:bg-blue-500'>
                            <img src={user.avatar} alt='user profile' className='w-9 aspect-[1/1] rounded-full'/>
                            <p>{user.name}</p>
                        </div>
                    :
                        chatData.map((item,index) => (
                            <div onClick={() =>setChat(item)} key={index} className={`flex gap-2 items-center pt-3 pb-3 pl-5 pr-5 text-sm cursor-pointer hover:bg-blue-500 ${item.messageSeen || item.messageId === messagesId ? '' : 'border-2 border-solid border-[#07fff3'}`}>
                                <img src={item.userData.avatar} alt='profile' className='w-9 aspect-[1/1] rounded-full'/>
                                <div className='flex flex-col'>
                                    <p>{item.userData.name}</p>
                                    <span className='text-gray-500 text-sm hover:text-white'>{item.lastMessage}</span>
                                </div>
                            </div>
                        ))
            }
        </div>
    </aside>
  )
}

export default LeftSidebar

// (chatData && chatData.length > 0) ? chatData.map((item, index) => (
//     <div onClick={() =>setChat(item)} key={index} className='flex gap-2 items-center pt-3 pb-3 pl-5 pr-5 text-sm cursor-pointer hover:bg-blue-500'>
//         <img src={item.userData.avatar} alt='profile' className='w-9 aspect-[1/1] rounded-full' />
//         <div className='flex flex-col'>
//             <p>{item.userData.name}</p>
//             <span className='text-gray-500 text-sm hover:text-white'>{item.lastMessages}</span>
//         </div>
//     </div>
// )) : <p className='text-center'>No chats available</p>