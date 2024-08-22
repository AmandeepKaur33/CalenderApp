import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parse } from 'date-fns';
import { useEvents } from './Context/EventContext';
import '../App.css';
import '../index.css';

// const Calendar = ({ currentMonth }) => {
//     const { events, handleEvent, setModalData, setToggleModal } = useEvents();
//     const monthStart = startOfMonth(currentMonth);
//     const monthEnd = endOfMonth(monthStart);
//     const startDate = startOfWeek(monthStart);
//     const endDate = endOfWeek(monthEnd);

//     const dateFormat = "d";
//     const rows = [];
//     const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//     // Render the day names header
//     rows.push(
//         <div className="w-full grid grid-cols-7 border border-gray-100" key="header">
//             {dayNames.map((dayName, index) => (
//                 <div className="col cell text-center font-bold border-b border-gray-100 p-2" key={index}>
//                     {dayName}
//                 </div>
//             ))}
//         </div>
//     );

//     let day = startDate;

//     while (day <= endDate) {
//         const days = [];

//         for (let i = 0; i < 7; i++) {
//             const currentDay = day; // Create a new scope for each day
//             const formattedDate = format(currentDay, dateFormat);
//             const formattedDates = format(currentDay, "yyyy-MM-dd");
//             const isCurrentMonth = isSameMonth(currentDay, monthStart);
//             const isToday = isSameDay(currentDay, new Date());
//             const dayEvents = events.filter(event => isSameDay(parse(event.date, 'yyyy-MM-dd', new Date()), currentDay));

//             days.push(
//                 <div
//                     className={`col cell ${!isCurrentMonth ? "text-[#d8d8d8]" : ""} flex items-end justify-between p-6 h-20 border border-gray-100`}
//                     key={formattedDates} 
//                     onClick={() => handleEvent(formattedDates)}
//                 >
//                     <span onClick={() => {
//                         if (dayEvents.length > 0) {
//                             setModalData({ data: dayEvents });
//                             setToggleModal(true);
//                         }
//                     }}>
//                         {dayEvents.map((event, index) => (
//                             <div key={index} className="event">
//                                 {event.title}
//                             </div>
//                         ))}
//                     </span>
//                     <span className={`${isToday ? 'bg-blue-500 px-2 py-1 rounded-full text-white' : ''}`}>
//                         {formattedDate}
//                     </span>
//                 </div>
//             );
//             day = addDays(day, 1);
//         }

//         rows.push(
//             <div className="w-full grid grid-cols-7 border border-gray-100" key={format(startDate, "yyyy-MM-dd")}>
//                 {days}
//             </div>
//         );
//     }

//     return (
//         <div className="calendar-body">
//             {rows}
//         </div>
//     );
// };
const Calendar = ({ currentMonth }) => {
    const { events, handleEvent , setModalData, setToggleModal} = useEvents();
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    const renderEvents = (day) => {
        const dayEvents = events.filter(event =>
            isSameDay(parse(event.date, 'yyyy-MM-dd', new Date()), day)
        );

        return dayEvents.map((event, index) => (
            <div key={index} className="event">
                {event.title}
            </div>
        ));
    };
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat);
            const currentDay = day;
            const dayEvents = events.filter(event => isSameDay(parse(event.date, 'yyyy-MM-dd', new Date()), currentDay));
            days.push(
                <div
                className={`col cell ${
                        !isSameMonth(day, monthStart) && "text-[#d8d8d8]"
                    } flex items-end justify-between p-6 h-20 border border-gray-100`}
                    key={day}
                    onClick={() => handleEvent(format(day, 'yyyy-MM-dd'))}
                >
                     <span onClick={() => {
                        if (dayEvents.length > 0) {
                            setModalData({ data: dayEvents });
                            setToggleModal(true);
                        }
                    }}>{renderEvents(day)}</span>
                    <span className={`${isSameDay(day, new Date()) && 'bg-blue-500 px-2 py-1 rounded-full text-white '}`}>
                        {formattedDate}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="w-full grid grid-cols-7 border border-gray-100 " key={day}>
                {days}
            </div>
        );
        days = [];
    }

    return <div className="calendar-body">{rows}</div>;
};
export default Calendar;
