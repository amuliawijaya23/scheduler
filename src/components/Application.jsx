import React, {useState, useEffect} from "react";
import axios from "axios";
import "components/styles/Application.scss";
import "components/Appointment"

// import components
import DayList from 'components/DayList';
import Appointment from "./Appointment";

// import helpers
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const setDay = (day) => {
    setState(prev => ({...prev, day }));
  };

  const bookInterview = (id, interview) => {
    const appointment = {...state.appointments[id], interview: {...interview}};
    const appointments = {...state.appointments, [id]: appointment};

    return new Promise((resolve, reject) =>  {
      axios.put(`/api/appointments/${id}`, {interview})
        .then(() => {
          setState({...state, appointments});
          resolve();
      }).catch(err => {
          console.log(err.message);
          reject();
      });
    });
  };
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((response) => {
      setState(prev => ({...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data
      }));
    }).catch((error) => console.log(error.message));
  }, [])

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  })

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
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
