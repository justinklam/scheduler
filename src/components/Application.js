import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from './DayList';
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointmentInfo = getAppointmentsForDay(state, state.day);
  // console.log('appointmentInfo -----', appointmentInfo)
  // console.log('interviewers -----', state.interviewers)

  const interviewerInfo = getInterviewersForDay(state, state.day);

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((all) => {
      // console.log('response-----', all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  },[])

  function bookInterview(id, interview, onSuccess) {
    // replace that specific interview with the new state.appointments[id] interview
    // reusing old data for everything else except interview

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // console.log('bookAppointment-----appointment', appointment);
    // console.log('bookAppointment-----ID', id);

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // calling useState, spread previous state and replacing appointments only with it
    // setState({
    //   ...state,
    //   appointments
    // })

    // console.log('bookInterview-----interviewStudent', interview.student);
    // console.log('bookInterview-----interviewInterviewer', interview.interviewer);

    axios.put(`http://localhost:8001/api/appointments/${appointment.id}`, appointment)
      .then(response => {
        // console.log('AXIOS-response-----RESPONSEONLY', response)
        setState({...state, appointments})
        onSuccess()
      })
      .catch(error => {
        // console.log('AXIOS-response-----appointmentID', appointment.id)
        console.log('PUT ERROR-----', error)
      })
  };

  const scheduleInfo = appointmentInfo.map(appointment => {
    // console.log('scheduleInfo - interview', interview);
    console.log('scheduleInfo - state', state);

    const interview = getInterview(state, appointment.interview);
    // console.log('scheduleInfo - appointment', appointment);

    const newAppointment = {
      ...appointment,
      interview
    };

    return (
      <Appointment
        key={newAppointment.id}
        interviewers={interviewerInfo}
        bookInterview={bookInterview}
        {...newAppointment}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {scheduleInfo}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};