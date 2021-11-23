import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {

  const {mode} = useVisualMode(props.interview ? SHOW : EMPTY);
  console.log('mode', mode);

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
    {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />)}
    </article>
  );
}