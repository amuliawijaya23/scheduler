import {useState, useEffect, useRef} from 'react';
import axios from 'axios';


export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const ws = useRef(0);
  
  useEffect(() => {
    ws.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)
    ws.current.onopen = () => {
      ws.current.send('ping')
      ws.current.onmessage = (e) => console.log(e.data);
    }

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


  const setDay = (day) => {
    setState(prev => ({...prev, day }));
  };

  const getSpotsForDay = (state, day) => {
    const selectedDay = state.days.find((x) => x.name === day);
    let spots = 0;

    (selectedDay.appointments).forEach(appointment => {
      if (state.appointments[appointment].interview === null) spots++;
    })
    return {spots, day: selectedDay.id - 1};
  }

  const bookInterview = (id, interview) => {
    const appointment = {...state.appointments[id], interview: {...interview}};
    const appointments = {...state.appointments, [id]: appointment};

    const {spots, day} = getSpotsForDay({...state, appointments}, state.day);

    const selectedDay = {...state.days[day], spots};
    const days = state.days.map(Day => (Day.name === state.day) ? selectedDay : Day)

    return new Promise((resolve, reject) =>  {
      axios.put(`/api/appointments/${id}`, {interview})
        .then(() => {
          setState({...state, appointments, days});
          resolve();
        })
        .catch(err => {
          console.log(err.message);
          reject();
        });
    });
  };

  const cancelInterview = (id) => {
    const appointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: appointment};

    const {spots, day} = getSpotsForDay({...state, appointments}, state.day);

    const selectedDay = {...state.days[day], spots};
    const days = state.days.map(Day => (Day.name === state.day) ? selectedDay : Day)

    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`)
        .then(() => {
          setState({...state, appointments, days});
          resolve();
        })
        .catch(err => {
          console.log(err.message);
          reject();
        });
    });
  };

  return {state, setDay, bookInterview, cancelInterview}
}