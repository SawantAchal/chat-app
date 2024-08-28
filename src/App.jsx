import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import ProfileUpdate from './pages/ProfileUpdate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firbase'

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth , async(user)=>{
      if (user) {
        navigate('/chat')
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
