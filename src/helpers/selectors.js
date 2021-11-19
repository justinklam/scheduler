import React, { useState } from 'react';

export function getAppointmentsForDay(state, day) {

  const matchDay = state.days.find(element => element.name === day);
  if (state.days.length === 0 || matchDay === undefined) {
    return [];
  }
  return matchDay.appointments.map(id => state.appointments[id]);

}