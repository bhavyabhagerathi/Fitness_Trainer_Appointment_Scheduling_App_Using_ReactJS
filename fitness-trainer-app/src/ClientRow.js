import React, { useState } from 'react';


const ClientRow = ({ client, onEditClient, onDeleteAppointment, onSaveAppointment }) => {
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newAppointment, setNewAppointment] = useState('');
  const [message, setMessage] = useState('');


  const handleAddAppointment = () => {
    setIsAddingAppointment(true);
    setMessage(''); // Clear any existing messages
  };


  const handleDeleteAppointment = (index) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this appointment?');


    if (isConfirmed) {
      onDeleteAppointment(index);
      setMessage('Appointment deleted successfully!');


      // Clear message after 3 seconds (adjust the time as needed)
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };


  const handleEdit = () => {
    setIsEditing(true);
    setMessage(''); // Clear any existing messages
  };


  const handleSave = () => {
    setIsEditing(false);
    // Implement the logic to save edited client information
    setMessage('Client information saved successfully!');


    // Clear message after 3 seconds (adjust the time as needed)
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };


  const handleCancelAddAppointment = () => {
    setIsAddingAppointment(false);
    setNewAppointment('');
    setMessage(''); // Clear any existing messages
  };


  const handleSaveAppointment = (index) => {
    // Implement the logic to save the new appointment
    setIsAddingAppointment(false);
    setNewAppointment('');
    onSaveAppointment(index, newAppointment);
    setMessage('Appointment added successfully!');


    // Clear message after 3 seconds (adjust the time as needed)
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };


  return (
    <div className="client-row">
      {message && <div className="message">{message}</div>}
      <div className="client-info">
        {isEditing ? (
          <div>
            <div>
              <label>First Name : </label>
              <input
                type="text"
                value={client.firstName}
                onChange={(e) => onEditClient(client.id, 'firstName', e.target.value)}
              />
            </div>
            <div>
              <label>Last Name : </label>
              <input
                type="text"
                value={client.lastName}
                onChange={(e) => onEditClient(client.id, 'lastName', e.target.value)}
              />
            </div>
            <div>
              <label>Location : </label>
              <input
                type="text"
                value={client.location}
                onChange={(e) => onEditClient(client.id, 'location', e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div>
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
        )}
      </div>
      <div className="appointments-field">
        <label>Appointments:</label>
        <ul>
          {client.appointments.map((appointment, index) => (
            <li key={index}>
              <span>{appointment}</span>
              <button id='del_button' onClick={() => handleDeleteAppointment(index)}>Delete</button>
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
            <button onClick={() => handleSaveAppointment(client.appointments.length)}>Save</button>
            <button onClick={handleCancelAddAppointment}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleAddAppointment}>Add Appointment</button>
        )}
      </div>
      <button onClick={handleEdit}>Edit</button>
      {isEditing && <button onClick={handleSave}>Save</button>}
    </div>
  );
};


export default ClientRow;
