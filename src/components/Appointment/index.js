import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from "./Status";
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  // console.log('APPOINTMENT PROPS-----', props);

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);
  // console.log('mode', mode);
  const transitionToShow = () => {
    transition(SHOW);
  }
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview, transitionToShow);
    // console.log('Appointment-interview', interview);
    // transition(SHOW);
  };

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />)}
    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />)}
    {mode === SAVING && <Status message="Saving"/>}
    </article>
  );
}