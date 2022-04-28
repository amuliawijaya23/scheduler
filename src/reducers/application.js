export const SET_DAY = 'SET_DAY';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_INTERVIEW = 'SET_INTERVIEW';

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.value};

    case SET_APPLICATION_DATA:
      return {...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };

    case SET_INTERVIEW:
      const appointment = {...state.appointments[action.id], interview: action.interview};
      const appointments = {...state.appointments, [action.id]: appointment};
      
      const findDay = state.days.find((dayObj) => dayObj.appointments.includes(action.id))
      let spots = 0;

      findDay.appointments.forEach((appointmentId) => {
        if (appointments[appointmentId].interview === null) spots++
      })

      const days = state.days.map(day => (day.name === findDay.name) ? {...day, spots} : day);

      return {...state, appointments, days};
    
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  };
};