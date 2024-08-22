import React from 'react';
import { format } from 'date-fns';

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className='w-full flex items-center justify-center text-base text-gray-500 mb-10'>
            <div className='flex items-center gap:2 sm:gap-9'>
                    <button className='shadow-lg border border-gray-100 px-3 py-1 rounded-full' onClick={prevMonth} >&lt;</button>
                    <h1 className='text-[#F77F00] font-bold w-96 text-3xl text-center'><span>{format(currentMonth, 'MMMM yyyy')}</span></h1>
                    <button className='shadow-lg border border-gray-100 px-3 py-1 rounded-full' onClick={nextMonth}>&gt;</button>
                </div>
            
        </div>
    );
};

export default CalendarHeader;