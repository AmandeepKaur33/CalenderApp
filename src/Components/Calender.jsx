import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  parse,
  eachDayOfInterval,
} from "date-fns";
import { useEvents } from "./Context/EventContext";
import "../App.css";
import "../index.css";

const Calendar = ({ currentMonth }) => {
  const { events , setModalData, setToggleModal} = useEvents();
  const [currentDay, setCurrentDay] = useState()
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const monthStart = startOfMonth(currentMonth);
  const endDate = endOfWeek(endOfMonth(currentMonth));

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const renderEvents = (day) => {
    const dayEvents = events.filter((event) =>
      isSameDay(parse(event.date, "yyyy-MM-dd", new Date()), day)
    );

    return dayEvents.map((event, index) => (
      <div key={index} className="event">
        {event.title}
      </div>
    ));
  };
  const dayEvents = events.filter(event => isSameDay(parse(event.date, 'yyyy-MM-dd', new Date()), currentDay));
  return (
    <div>
      <div className="grid grid-cols-7">
        {dayNames?.map((days, index) => (
          <h1 key={index} className="text-center">
            {days}
          </h1>
        ))}
      </div>
      <div
       className="w-full grid grid-cols-7 border border-gray-100"
      >
        {days.map((day) => (
          <div
          onClick={(e) =>{
            e.preventDefault()
            setCurrentDay(day)}}
            key={day}
            className={`flex items-end ${!isSameMonth(day, monthStart) && "text-[#d8d8d8]"} ${renderEvents(day).length ? 'justify-between' : 'justify-end'} p-6 h-20 border border-gray-100`}
          >
            <span onClick={() => {
                        if (dayEvents.length > 0) {
                            setModalData({ data: dayEvents });
                            setToggleModal(true);
                        }
                    }}>{renderEvents(day)}</span>
            <span className={`${isSameDay(day, new Date()) && 'bg-blue-500 px-2 py-1 rounded-full text-white '}`}>{format(day, "d")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Calendar;
