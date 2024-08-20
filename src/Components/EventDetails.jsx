import React from 'react'
import { useEvents } from './Context/EventContext'
import { format } from 'date-fns';
import { FaCalendarDays } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdOutlineWork } from "react-icons/md";
import { PiPersonArmsSpreadLight } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const EventDetails = () => {
    const {ModalData,setToggleModal,setModalData, setEventId, setTitle, setDate, setEventCategory, editEvent, deleteEvent} = useEvents();
    const navigate = useNavigate();
  return (
    <div className="w-full h-screen absolute ">
    <div className="top-0 left-0 right-0 bottom-0 fixed bg-blue-50 opacity-65"></div>
    <div className="fixed flex flex-col items-start gap-6 w-1/4 h-2/6 bg-gradient-to-r to-blue-950 from-purple-500 top-[30%] px-6 py-8 left-[50%] translate-x-[-50%] ">
        <div
            className="absolute top-1 right-1 px-2 text-white bg-red-500 cursor-pointer"
            onClick={() => {
                setModalData({ data: "" })
                setToggleModal(false)
            }}
        >
            X
        </div>
        {ModalData.data && ModalData.data.length > 0 ? (
            ModalData.data.map((event, index) => (
                <div key={index} className="text-white w-full">
                    <h3 className='font-medium text-xl'>{event.title}</h3>
                    <div className='flex items-center justify-between w-full mt-2'>
                    <div className='text-white flex items-center gap-1 text-base'>
                        <FaCalendarDays/>
                        {format(new Date(event.date), 'MMMM d, yyyy')}
                    </div>
                    <p className={`${event?.eventCategory === "work" ? 'bg-yellow-500' : 'bg-pink-400'} flex items-center gap-1 text-white px-3 py-1 rounded-3xl`}>
                        {event?.eventCategory === "work" ? <MdOutlineWork/> : <PiPersonArmsSpreadLight/>}
                        {event.eventCategory}
                    </p>
                    </div>
                    <div className='mt-16 flex items-center gap-5 '>
                    <MdEdit onClick={() => {
                        editEvent(event?.id);
                        setEventId(event.id);
                                setTitle(event.title);
                                setDate(event.date);
                                setEventCategory(event.eventCategory);
                        navigate("/eventform")
                        setToggleModal(false)
                    }} className='text-pink-500 text-4xl bg-white px-1 rounded-full'/>
                    <MdDelete className='text-green-500 text-4xl bg-white px-1 rounded-full ' onClick={() => {
                        deleteEvent(event?.id);
                        setToggleModal(false);
                        setModalData({data: ""})
                    }}/>
                    </div>
                </div>
            ))
        ) : (
            <p>No events for this day.</p>
        )}
    </div>
</div>
  )
}

export default EventDetails