import React from 'react'
import { MdAddAlert, MdHome } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
  return (
    <div className='w-full h-[7vh] flex items-center justify-between bg-white rounded-3xl px-3'>
        <h1>Calender</h1>
        {location.pathname === "/eventform" 
        ?
        <MdHome onClick={() => navigate(-1)} className='text-2xl p-1  text-white font-bold  rounded-full  bg-blue-500 flex items-center justify-center'/>
        :
      // / onClick={() => navigate("/eventform")} className='text-xl  text-white font-bold pb-1 rounded-full  bg-blue-500 px-2 flex items-center justify-center'>
      //       +
      //   />
      <MdAddAlert onClick={() => navigate("/eventform")} className='text-2xl p-1  text-white font-bold  rounded-full  bg-blue-500 flex items-center justify-center'/>
      }
    </div>
  )
}

export default Navbar