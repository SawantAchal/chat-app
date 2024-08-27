import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import ProfileUpdate from './pages/ProfileUpdate'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
        <Route path='profile' element={<ProfileUpdate/>}/>
      </Routes>
    </>
  )
}

export default App
