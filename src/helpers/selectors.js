//----- Helper Functions -----//

//----- Get Appointments For the specified day -----//
function getAppointmentsForDay(state, day) {

  const matchDay = state.days.find(element => element.name === day);
  if (state.days.length === 0 || matchDay === undefined) {
    return [];
  }
  return matchDay.appointments.map(id => state.appointments[id]);
};

//----- Get Interviewers For the specified day -----//
function getInterviewersForDay(state, day) {

  const matchDay = state.days.find(element => element.name === day);
  if (state.days.length === 0 || matchDay === undefined) {
    return [];
  }
  return matchDay.interviewers.map(id => state.interviewers[id]);
};

//----- Get Interviews  -----//
function getInterview(state, interview) {
  
  if (!interview) {
    return null;
  }
  
  const {student, interviewer} = interview;
  const returnInterviewer = state.interviewers[interviewer];
  
  const interviewObj = {
    student: student,
    interviewer: returnInterviewer
  };

  return interviewObj;
};

//----- Export Functions  -----//
export { 
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview 
};