import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import ProfileUpdate from './pages/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firbase'
import { AppContext } from './context/AppContext'


function App() {
  const navigate = useNavigate()
  const {loadUserData} = useContext(AppContext)

  useEffect(() => {
    onAuthStateChanged(auth , async(user)=>{
      if (user) {
        navigate('/chat')
        console.log(user)
        await loadUserData(user.uid)
      }else{
        navigate('/')
      }
    })
  }, [])

  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
        <Route path='/profile' element={<ProfileUpdate/>}/>
      </Routes>
    </>
  )
}

export default App
