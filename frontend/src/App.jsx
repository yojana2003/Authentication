import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SingnUp from './pages/SingnUp'
import Login from './pages/Login'
import Home from './pages/Home'
import { dataContext } from './context/userContext'

const App = () => {
let {userData, setUserData}=useContext(dataContext)

  return (

    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<SingnUp/>}/>
      <Route path='/login' element={<Login/>}/>
<Route
        path="/home"
        element={userData ? <Home/> : <Navigate to="/login" />}
      />  
        </Routes>
  )
}

export default App
