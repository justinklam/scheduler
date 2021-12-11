import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  },[])

  const spotUpdate = function(value) {
    const updatedDays = [];
    for (let currentDay of state.days) {
      if (currentDay.name === state.day) {
        updatedDays.push({...currentDay, spots: currentDay.spots + (value)})
      } else {
        updatedDays.push(currentDay)
      }
    }
    return updatedDays;
  };

  const setDay = day => setState({ ...state, day });

  const bookInterview = function(id, interview, editing) {
    const appointment = {
      // replace that specific interview with the new state.appointments[id] interview
      // reusing old data for everything else except interview
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let newDays = state.days;
    if (!editing) {
      newDays = spotUpdate(-1);
    }

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(response => {
      setState({...state, appointments, days: newDays})
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

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        setState({...state, appointments, days: spotUpdate(1)})
      })
      .catch(error => {
        throw error;
      })
  };

  return {state, setDay, bookInterview, cancelInterview};
}