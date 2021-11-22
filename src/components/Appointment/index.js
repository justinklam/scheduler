import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";

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