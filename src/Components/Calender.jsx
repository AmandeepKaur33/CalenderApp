import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parse } from 'date-fns';
import { useEvents } from './Context/EventContext';
import '../App.css';
import '../index.css';

const Calendar = ({ currentMonth }) => {
    const { events, handleEvent, setModalData , setToggleModal} = useEvents();
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

    const selectedEvent = (day) => {
        const event = events.filter(event =>
            isSameDay(parse(event.date, 'yyyy-MM-dd', new Date()), day)
        );

        return event;
    };

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
   
    rows.push(
        <div className="w-full grid grid-cols-7 border border-gray-100" key="header">
            {dayNames.map((dayName, index) => (
                <div className="col cell text-center font-bold border-b border-gray-100 p-2" key={index}>
                    {dayName}
                </div>
            ))}
        </div>
    );

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat);
            const formattedDates = format(day, "yyyy-MM-dd");
            
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? "text-[#d8d8d8]"
                            : ""
                    } flex items-end justify-between p-6 h-20 border border-gray-100`}
                    key={day} 
                    onClick={() => handleEvent(format(day, 'yyyy-MM-dd'))}
                >
                    <span onClick={() => {
                        if (renderEvents(day)) {
                            setModalData({ data: selectedEvent(formattedDates) });
                            setToggleModal(true);
                        }
                    }}>
                        {renderEvents(day)}
                    </span>
                    <span className={`${isSameDay(day, new Date()) ? 'bg-blue-500 px-2 py-1 rounded-full text-white' : ''}`}>
                        {formattedDate}
                    </span>
                </div>
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="w-full grid grid-cols-7 border border-gray-100" key={day}>
                {days}
            </div>
        );
        days = [];
    }

    return <div className="calendar-body">{rows}</div>;
};

export default Calendar;
