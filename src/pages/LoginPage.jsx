import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {
    const [cuurentState , setCurrentState] = useState('Sign Up');
  return (
    <>
        <main className='min-h-[100vh] bg-no-repeat bg-cover flex items-center  justify-evenly' style={{backgroundImage: `url('/background.png')`}}>
            <img src={assets.logo_big} alt='chat logo' className='w-[max(20vw,200px)]' />
            <form className='bg-white pt-2 pb-2 pl-3 pr-3 flex flex-col gap-5 rounded-xl'>
                <h2 className='font-medium'>{cuurentState}</h2>
                {
                cuurentState ==='Sign Up' ? <input type='text' placeholder='Username' className='pt-2 pb-2 pl-3 pr-3 border border-solid border-[#c9c9c9] rounded outline-blue-400' required/> : null
                }
                <input type='email' placeholder='Email Address' className='pt-2 pb-2 pl-3 pr-3 border border-solid border-[#c9c9c9] rounded outline-blue-400' required/>
                <input type='password' placeholder='Password' className='pt-2 pb-2 pl-3 pr-3 border border-solid border-[#c9c9c9] rounded outline-blue-400' required/>
                <button type='submit' className='bg-blue-600 text-white text-base rounded cursor-pointer p-3'>{cuurentState === 'Sign Up' ? "Create Account" : "Login"}</button>
                <div className='flex gap-1 text-sm text-gray-600'>
                    <input type='checkbox'/>
                    <p>Agree to the terms of use & privacy policy.</p>
                </div>
                <div className='flex flex-col gap-1'>
                    {
                    cuurentState === 'Sign Up' ? <p className='text-sm text-gray-600'>Already have an account <span onClick={() => setCurrentState("Login")} className='font-medium text-blue-500 '>Login here</span></p>
                    : <p className='text-sm text-gray-600'>Create An Account <span onClick={() => setCurrentState("Sign Up")} className='font-medium text-blue-500 '>Click here</span></p>
                    }
                </div>
            </form>
        </main>
    </>
  )
}

export default LoginPage