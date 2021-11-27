import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
    .then((all) => {
      console.log('useEFFECT ALL', all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  },[])

  const setDay = day => setState({ ...state, day });

  const bookInterview = function(id, interview) {
    // replace that specific interview with the new state.appointments[id] interview
    // reusing old data for everything else except interview
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(response => {
        setState({...state, appointments})
        // calling useState, spread previous state and replacing appointments only with it
      })
      .catch(error => {
        throw error;
      })
  };

  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(response => {
        setState({...state, appointments})
      })
      .catch(error => {
        throw error;
      })
  };

  return {state, setDay, bookInterview, cancelInterview};
}