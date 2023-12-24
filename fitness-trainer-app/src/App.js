import React, { useState } from 'react';
import './App.css';
import ClientRow from './ClientRow';
import logo from './images/logo1.jpg';
import Calendar from './Calendar';


function App() {
  const [clients, setClients] = useState([
    {
      id: 1,
      firstName: 'Bhavya',
      lastName: 'Bhagerathi',
      location: 'Bangalore',
      appointments: ['2023-12-10 09:00 AM', '2023-12-15 03:30 PM'],
    },
    {
      id: 2,
      firstName: 'Niharika',
      lastName: 'NM',
      location: 'Mumbai',
      appointments: ['2023-12-12 11:00 AM', '2023-12-18 02:00 PM'],
    },
    {
      id: 3,
      firstName: 'Harshvardhan',
      lastName: 'Rane',
      location: 'Bhopal',
      appointments: ['2024-01-12 10:00 AM', '2022-02-18 01:30 PM'],
    },
    {
      id: 4,
      firstName: 'Mukund',
      lastName: 'B',
      location: 'Ahmedabad',
      appointments: ['2024-03-22 11:00 AM'],
    },
    // Add more clients as needed
  ]);


  const [showCalendar, setShowCalendar] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  const [message, setMessage] = useState('');


  const handleEditClient = (clientId, field, value) => {
    // Implement the logic to edit client information
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId ? { ...client, [field]: value } : client
      )
    );
    setMessage('Client information saved successfully!');


    // Clear message after 3 seconds (adjust the time as needed)
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };


  const handleDeleteAppointment = (clientId, appointmentIndex) => {
    // Implement the logic to delete an appointment
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              appointments: [
                ...client.appointments.slice(0, appointmentIndex),
                ...client.appointments.slice(appointmentIndex + 1),
              ],
            }
          : client
      )
    );
    setMessage('Appointment deleted successfully!');


    // Clear message after 3 seconds (adjust the time as needed)
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };


  const handleSaveAppointment = (clientId, newAppointment) => {
    // Implement the logic to save the new appointment
    const updatedClients = clients.map((c) =>
      c.id === clientId
        ? { ...c, appointments: [...c.appointments, newAppointment] }
        : c
    );
 
    setClients(updatedClients);
    setMessage('Appointment added successfully!');


    // Clear message after 3 seconds (adjust the time as needed)
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };


  const handleShowCalendar = () => {
    const allAppointments = clients.reduce((appointments, client) => {
      return [...appointments, ...client.appointments.map((appointment) => ({ clientName: `${client.firstName} ${client.lastName}`, dateTime: appointment }))];
    }, []);
    setShowCalendar(true);
    setAllAppointments(allAppointments);
  };


  return (
    <div className="App">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h1>FITNESS TRAINER APPOINTMENT SCHEDULE</h1>
      {message && <div className="message">{message}</div>}
      {showCalendar ? (
        <Calendar appointments={allAppointments} />
      ) : (
        <div>
          {clients.map((client) => (
            <ClientRow
              key={client.id}
              client={client}
              onEditClient={handleEditClient}
              onDeleteAppointment={handleDeleteAppointment}
              onSaveAppointment={handleSaveAppointment}
            />
          ))}
          <button onClick={handleShowCalendar}>Show Calendar</button>
        </div>
      )}
    </div>
  );
}


export default App;