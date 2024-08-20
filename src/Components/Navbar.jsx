import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full h-[7vh] flex items-center justify-between bg-white rounded-3xl px-3'>
        <h1>Calender</h1>
        <h3 onClick={() => navigate("/eventform")} className='text-xl  text-white font-bold pb-1 rounded-full  bg-blue-500 px-2 flex items-center justify-center'>
            +
        </h3>
    </div>
  )
}

export default Navbar