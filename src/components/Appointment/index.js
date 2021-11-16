import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';


export default function Appointment(props) {

  // Unneeded?
  // const appointmentNotice = () => {
  //   if (!props.time) {
  //     return 'No Appointments'
  //   }
  //   return `Appointment at ${props.time}`
  // };

  const appointmentNotice = () => {
    if (props.interview) {
      return (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )
    }
    return (
      <Empty
      />
    )
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      <div>{appointmentNotice()}</div>
    </article>
  );
}