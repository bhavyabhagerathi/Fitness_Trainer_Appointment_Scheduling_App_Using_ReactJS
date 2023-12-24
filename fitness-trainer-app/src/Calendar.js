import React, { useState } from 'react';
import Calendar from 'react-calendar';


const CustomCalendar = ({ appointments }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());


  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];


      const appointmentsOnDate = appointments.filter(
        (appointment) => appointment.dateTime.split(' ')[0] === formattedDate
      );


      return <div>{appointmentsOnDate.map((appointment) => appointment.clientName)}</div>;
    }


    return null;
  };


  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent}
        calendarType="US"
      />
    </div>
  );
};


export default CustomCalendar;
