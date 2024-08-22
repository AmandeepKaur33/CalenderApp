import React, { createContext, useState, useContext } from 'react';

const EventContext = createContext();

export const useEvents = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([
        { id: 1, eventCategory: 'Personal', date: '2023-08-15', title: 'Independence Day' },
        { id: 2, eventCategory: 'Personal', date: '2023-08-19', title: 'Raksha Bandhan' },
        { id: 3, eventCategory: 'Personal', date: '2023-08-29', title: 'Birthday' },
        // more events...
    ]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [eventCategory, setEventCategory] = useState('work');
    const [eventId, setEventId] = useState(null);
    const [ModalData, setModalData] = useState({ data: ""});
    const [toggleModal, setToggleModal] = useState(false)
console.log(ModalData,toggleModal);

    const addEvent = (event) => {
        setEvents((prevEvents) => [...prevEvents, event]);
        console.log("events",events);
        
    };

    const editEvent = (id, updatedEvent) => {
        setEvents((prevEvents) => 
            prevEvents.map(event => event.id === id ? updatedEvent : event)
        );
    };
    
    const deleteEvent = (id) => {
        setEvents((prevEvents) => 
            prevEvents.filter(event => event.id !== id)
        );
    };

    const handleEvent = (e) => {
        console.log(e, events?.map((i) => i?.date));

       const gg = events?.filter((i)=> i?.date !== e)
       console.log(gg,"hh",events);
       
    }
console.log(ModalData.data,"data");

    return (
        <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent, handleEvent, ModalData, setModalData, toggleModal, setToggleModal, eventId, setEventId, eventCategory, setEventCategory, title, setTitle, date, setDate }}>
            {children}
        </EventContext.Provider>
    );
};
