import React from 'react';
import './styles.scss';

export default function Appointment(props) {

  const appointmentNotice = () => {
    if (!props.time) {
      return 'No Appointments'
    }
    return `Appointment at ${props.time}`
  }
  return (
    <article className="appointment">
      <div>{appointmentNotice()}</div>
    </article>
  );
}