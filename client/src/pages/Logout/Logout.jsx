import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice' 

function Logout() {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const onLogout = () => {
      localStorage.clear();
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <div className='flex flex-col flex-1'>
       <button onClick={onLogout} className="flex p-2 justify-center items-center gap-2 border-2 border-solid border-[#6B3FA0] rounded-md bg-white text-[#6B3FA0] hover:bg-[#6B3FA0] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#6B3FA0]" style={{ marginLeft: '10px', width: '100px' }} >
        LogOut
        </button>
    </div>
  )
}

export default Logout