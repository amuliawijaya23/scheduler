export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find(x => x.name === day);
  let appointments = [];
  
  if(selectedDay) {
    appointments = selectedDay.appointments.map(id => state.appointments[id])
  }

  return appointments;

}