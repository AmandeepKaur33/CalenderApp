import React from 'react';
import { useEvents } from './Context/EventContext';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete, MdEdit } from 'react-icons/md';

const EventForm = () => {
    const { events, addEvent, title, setTitle, date, setDate , editEvent, deleteEvent, eventCategory, setEventCategory, eventId, setEventId} = useEvents();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && date) {
            if (eventId) {
                editEvent(eventId, { title, date, eventCategory });
            } else {
                addEvent({ id: uuidv4(), title, date, eventCategory });
            }
            setTitle('');
            setDate('');
            setEventId(null);
        }
    };
    return (
        <div className="w-full h-[80vh] bg-blue-400 pt-6 flex flex-col overflow-auto">
        <form onSubmit={handleSubmit} className='w-full justify-center gap-5 flex flex-col items-center' >
            <div className='flex flex-col gap-1 w-11/12 pl-16'>
                <label htmlFor="event-title" className='text-xl text-white'>Title:</label>
                <input
                    type="text"
                    id="event-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-11/12 px-2'
                />
            </div>
            <div className='flex flex-col gap-1 w-11/12 pl-16'>
                <label htmlFor="event-date" className='text-xl text-white'>Date:</label>
                <input
                    type="date"
                    id="event-date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className='w-11/12 p-2'
                />
            </div>
            <div className='flex flex-col gap-1 w-11/12 pl-16'>
                <label htmlFor="event-category" className='text-xl text-white'>Category</label>
            <select onChange={(e) => setEventCategory(e.target.value)} value={eventCategory} className='w-11/12 p-2' id='event-category'>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
            </select>
            </div>
            <button type="submit" className='bg-purple-800 px-3 py-1 mt-4 text-xl text-white'>Add Event</button>
        </form>
        <div className='w-full flex items-center bg-white mt-6 justify-center'>
            <table className='w-full text-left text-sm  ml-20' role="table" >
                <thead>
                    <tr>
                    <th className='py-3.5 pr-3 font-semibold text-xl text-blue-600'>Category</th>
                    <th className='py-3.5 pr-3 font-semibold text-xl text-blue-600'>Title</th>
                    <th className='py-3.5 pr-3 font-semibold text-xl text-blue-600'>Date</th>
                    <th colSpan={2} className='py-3.5 pr-3 font-semibold text-xl text-blue-600'>Action</th>
                    </tr>
                </thead>
                <tbody className=' border-t border-gray-300 '>
                    {events?.map((event)=>(
                        <tr className='border-t border-gray-200' key={event?.id}>
                            <td className='py-4 pr-3 text-gray-900 font-medium'>{event?.title}</td>
                            <td className='py-4 pr-3 text-gray-900 font-medium'>{event?.eventCategory}</td>
                            <td className='py-4 pr-3 text-gray-900 font-medium'>{event?.date}</td>
                            <td className='flex'><MdEdit onClick={() =>{
                                setEventId(event.id);
                                setTitle(event.title);
                                setDate(event.date);
                                setEventCategory(event.eventCategory);
                            }} className='text-pink-500 text-4xl bg-white px-1 rounded-full'/>
                            <MdDelete className='text-green-500 text-4xl bg-white px-1 rounded-full ' onClick={() => deleteEvent(event?.id)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};


export default EventForm;
