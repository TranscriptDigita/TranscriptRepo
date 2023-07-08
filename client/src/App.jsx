// import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './pages/auth/views/Signup'
import Login from './pages/auth/views/Login'
import Home from './pages/main/Home'

function App() {

  return (
    <div className='h-screen'>
    <Router>  
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* <Route path="*" element={<NotFound/>}/> */}
      </Routes>  
    </Router>
    <ToastContainer />
    </div>
  )
}

export default App
