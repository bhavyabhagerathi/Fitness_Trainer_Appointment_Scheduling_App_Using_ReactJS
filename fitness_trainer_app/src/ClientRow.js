import React, { useState } from 'react';

const ClientRow = ({ client, onEditClient, onDeleteAppointment, onSaveAppointment }) => {
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [newAppointment, setNewAppointment] = useState('');
  const [message, setMessage] = useState('');

  const handleAddAppointment = () => {
    setIsAddingAppointment(true);
    setMessage(''); // Clear any existing messages
  };

  const handleDeleteAppointment = (index) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this appointment?');

    if (isConfirmed) {
      onDeleteAppointment(client.id, index);
      setMessage('Appointment deleted successfully!');
    }
  };

  const handleSave = () => {
    // Implement the logic to save edited client information
    setMessage('Client information saved successfully!');
  };

  const handleCancelAddAppointment = () => {
    setIsAddingAppointment(false);
    setNewAppointment('');
    setMessage(''); // Clear any existing messages
  };

  const handleSaveAppointment = () => {
    // Implement the logic to save the new appointment
    setIsAddingAppointment(false);
    setNewAppointment('');
    setMessage('Appointment added successfully!');
    onSaveAppointment(client.id, newAppointment);
  };

  return (
    <div className="client-row">
      {message && <div className="message">{message}</div>}
      <div className="client-info">
        <div>
          <label>First Name : </label>
          <span>{client.firstName}</span>
        </div>
        <div>
          <label>Last Name : </label>
          <span>{client.lastName}</span>
        </div>
        <div>
          <label>Location : </label>
          <span>{client.location}</span>
        </div>
      </div>
      <div className="appointments-field">
        <label>Appointments:</label>
        <ul>
          {client.appointments.map((appointment, index) => (
            <li key={index}>
              <span>{appointment}</span>
              <button onClick={() => handleDeleteAppointment(index)}>Delete</button>
            </li>
          ))}
        </ul>
        {isAddingAppointment ? (
          <div>
            <input
              type="text"
              placeholder="New Appointment"
              value={newAppointment}
              onChange={(e) => setNewAppointment(e.target.value)}
            />
            <button onClick={handleSaveAppointment}>Save</button>
            <button onClick={handleCancelAddAppointment}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleAddAppointment}>Add Appointment</button>
        )}
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ClientRow;
