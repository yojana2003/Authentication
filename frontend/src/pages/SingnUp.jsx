import React, { useContext, useRef, useState } from 'react'
import profileImg from "../assets/profileImg.webp"
import { dataContext } from '../context/userContext'
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SingnUp = () => {
  let { serverUrl, userData, setUserData, getUserdata } = useContext(dataContext)
  let navigate = useNavigate()

  let [firstName, setFirstName] = useState("")
  let [lastName, setLastName] = useState("")
  let [userName, setUserName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let file = useRef(null)

  const handleSignUP = async (e) => {
    e.preventDefault()
    try {
      let formdata = new FormData()
      formdata.append("firstName", firstName)
      formdata.append("lastName", lastName)
      formdata.append("userName", userName)
      formdata.append("email", email)
      formdata.append("password", password)
      if (backendImage) {
        formdata.append("profileImage", backendImage)
        console.log(backendImage)
      }
      let { data } = await axios.post(
        serverUrl + "/api/signup",
        formdata,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      )
      await getUserdata()
      setUserData(data.user)   // user response
      navigate("/")

    } catch (error) {
      console.log(error.response?.data || error.message)
    }
  }

  let [frontendImage, setFrontendImage] = useState(profileImg)
  let [backendImage, setBackendImage] = useState(null)


  function handleImage(e) {
    let file = e.target.files[0]
    setBackendImage(file)
    let image = URL.createObjectURL(file)
    setFrontendImage(image)
  }

  return (
    <div className='w-full min-h-screen bg-black flex justify-center items-center'>
      <div className='w-[90%] max-w-125 h-150 bg-[#141f1f] rounded flex flex-col justify-center items-center gap-5'>
        <h1 className='text-white text-5 font-semibold'>Sign Up</h1>

        <form className='w-full flex flex-col items-center justify-center gap-5'
          onSubmit={handleSignUP}>
          <input type="file" hidden ref={file} onChange={(e) => handleImage(e)} />
          <div className='w-24 h-24 rounded-full bg-white overflow-hidden relative border-2 border-white'>
            <img src={frontendImage} alt="profile img" className='w-full h-full' />
            <div className='absolute w-full h-full bg-black top-0 opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center text-white font-semibold text-[20px]'
              onClick={() => { file.current.click() }}>
              +
            </div>
          </div>
          <div className='w-[80%] h-12 flex justify-center items-center gap-2.5'>
            <input type="text" placeholder='first name' className='w-[50%] h-full bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
              value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" placeholder='last name' className='w-[50%] h-full bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
              value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <input type="text" placeholder='username' className='w-[80%] h-12 bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
            value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input type="email" placeholder='email' className='w-[80%] h-12 bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='password' className='w-[80%] h-12  bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
            value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className='bg-[#14c4ec] text-black px-2.5 py-[5px] rounded-lg'>Sign up</button>

          <p className='text-white cursor-pointer' onClick={() => navigate("/login")}>Already have an account ? <span className='text-blue-400'>Login</span></p>

        </form>

      </div>
    </div>
  )
}

export default SingnUp
