import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useApplicationData(props) {
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

    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`)
        .then(() => {
          setState({...state, appointments});
          resolve();
        })
        .catch(err => {
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



  return {state, setDay, bookInterview, cancelInterview}
}