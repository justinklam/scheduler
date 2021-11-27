import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from "./Status";
import useVisualMode from 'hooks/useVisualMode';
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";


export default function Appointment(props) {
  // console.log('APPOINTMENT PROPS-----', props);

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);
  
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    if (!interviewer || !name) {
      transition(ERROR_SAVE)
      return;
    }

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  };

  const deleteAppointment = function() {
    transition(DELETING);

    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
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
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />)}
    {mode === CREATE && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />)}
    {mode === SAVING && <Status message="Saving"/>}
    {mode === DELETING && <Status message="DELETING"/>}
    {mode === CONFIRM && (
      <Confirm 
        message="Are you sure you want to delete?"
        onCancel={back}
        onConfirm={deleteAppointment}
      />)}
    {mode === EDIT && (
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
      />)}
    {mode === ERROR_SAVE && (
      <Error 
        message="Missing Field"
        onClose={back}
      />)}
    </article>
  );
}