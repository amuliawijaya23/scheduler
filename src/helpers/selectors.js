// returns array of appointments for selected day
export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(x => x.name === day);
  let appointments = [];
  
  if(selectedDay) {
    appointments = selectedDay.appointments.map(id => state.appointments[id]);
  }
  return appointments;
};

// returns interview object
export function getInterview(state, interview) {
  let appointment = interview || null;

  if(appointment) {
    appointment = {...interview, interviewer: state.interviewers[interview.interviewer]}
  }

  return appointment;
}

// returns array of interviewers for selected day
export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.find(x => x.name === day);
  let interviewers = [];

  if(selectedDay) {
    interviewers = selectedDay.interviewers.map(id => state.interviewers[id]);
  }
  return interviewers;
};