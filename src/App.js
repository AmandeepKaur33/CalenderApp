import React from "react";
import "./index.css";
import CalenderApp from "./Components/CalenderApp.jsx";
import { Route, Routes } from "react-router-dom";
import EventForm from "./Components/EventForm.jsx";
import Navbar from "./Components/Navbar.jsx";
import { useEvents } from "./Components/Context/EventContext.jsx";
import EventDetails from "./Components/EventDetails.jsx";

const App = () => {
    const {toggleModal} = useEvents();
  return (
    <div className="w-full  bg-blue-50 flex flex-col p-6 gap-7 items-center">
      <Navbar />
      <Routes>
        <Route path="/" element={<CalenderApp />} />
        <Route path="/eventform" element={<EventForm />} />
      </Routes>
      {toggleModal && <EventDetails/>}
    </div>
  );
};

export default App;
