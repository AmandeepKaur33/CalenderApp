import React, { useState } from 'react'
import CalendarHeader from './CalenderHeader'
import Calendar from './Calender'
import { addMonths, subMonths } from 'date-fns';

const CalenderApp = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
  return (
    <div className='w-full bg-white rounded-2xl pt-6'>
    <CalendarHeader
    currentMonth={currentMonth}
    nextMonth={nextMonth}
    prevMonth={prevMonth}
/>
<Calendar currentMonth={currentMonth} />
{/* <div className=''></div> */}
</div>
  )
}

export default CalenderApp