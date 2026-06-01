import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const dataContext = createContext()

const UserContext = ({ children }) => {
  let navigate=useNavigate()

  let [userData, setUserData] = useState(null)
  

  const serverUrl = "http://localhost:8000"

  const getUserdata = async () => {
    try {
      let { data } = await axios.get(serverUrl + "/api/getuserdata",{
        withCredentials:true
      })
      setUserData(data)

    } catch (error) {
  console.log(error.response?.data || error.message)
}
  }



  const value = {
    serverUrl,userData, setUserData,getUserdata
  }

  useEffect(()=>{
   getUserdata()
  },[])

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext
