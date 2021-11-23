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
  console.log('appointmentInfo -----', appointmentInfo)
  console.log('interviewers -----', state.interviewers)

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

  const scheduleInfo = appointmentInfo.map(appointment => {
    // Unused
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id} 
        interviewers={interviewerInfo}
        {...appointment} 
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