import React from 'react'
import { useContext } from 'react'
import { dataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import profileImg from "../assets/profileImg.webp"
import axios from 'axios'


const Home = () => {

    let {userData, setUserData,getUserdata,serverUrl}=useContext(dataContext)
    let navigate=useNavigate()
      console.log("userData:", userData);

    if(!userData){
      navigate("/login")
      return null
    }
    const handleLogOut=async()=>{
      try {
      let data=  await axios.post(serverUrl +"/api/logout")
      setUserData(null)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='w-full h-screen bg-[#223946] flex flex-col justify-center items-center gap-5'>
       <div className='w-24 h-24 rounded-full bg-white overflow-hidden relative border-2 border-white'>
            <img src={userData.profileImage ? serverUrl + userData.profileImage : profileImg} alt="profile img" className='w-full h-full' />
            </div>
            
      <p className='text-white text-[20px]'>Hey
        , <span className='text-[#31afb1] text-[20px] font-semibold'>{userData.firstName}
          </span> welcome
          </p>
      <button className='bg-[#07c7e4] text-black px-[10px] py-[5px] rounded-lg'onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default Home
