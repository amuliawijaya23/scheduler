import React, {useState, useEffect} from "react";
import axios from "axios";
import "components/styles/Application.scss";
import "components/Appointment"

// import components
import DayList from 'components/DayList';
import Appointment from "./Appointment";

// import helpers
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  });

  const setDay = (day) => {
    setState(prev => ({...prev, day }));
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

  const appointmentsforday = dailyAppointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
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
        {appointmentsforday}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
