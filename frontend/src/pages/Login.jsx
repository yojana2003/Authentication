import React, { useContext, useState } from 'react'
import { dataContext } from '../context/userContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  let { serverUrl, userData, setUserData, getUserdata } = useContext(dataContext)

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  const handleLogin = async (e) => {
  e.preventDefault()
  console.log("form submitted")

  try {
    console.log("Sending request...")


    let { data } = await axios.post(
      serverUrl + "/api/login",
      { email, password },
      { withCredentials: true }
    )
console.log("Response:", data)

    setUserData(data.user)
    await getUserdata()

    if (data.user) {
       console.log("Navigating...")
      navigate("/home")
    }

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message)
    alert(error.response?.data?.message)
  }
}

  return (
    <div className='w-full min-h-screen bg-black flex justify-center items-center'>
      <div className='w-[90%] max-w-125 h-[600px] bg-[#141f1f] rounded flex flex-col justify-center items-center gap-5'>
        <h1 className='text-white text-5 font-semibold'>Log In</h1>

        <form className='w-full flex flex-col items-center justify-center gap-[20px]'
          onSubmit={handleLogin}>

          <input type="email" placeholder='email' className='w-[80%] h-12 bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='password' className='w-[80%] h-12  bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
            value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className='bg-[#14c4ec] text-black px-[10px] py-[5px] rounded-lg cursor-pointer'>Log In</button>

          <p className='text-white cursor-pointer' onClick={() => navigate("/signup")}>create new account ? <span className='text-blue-400'>Sign up</span></p>
        </form>

      </div>
    </div>
  )
}


export default Login





















