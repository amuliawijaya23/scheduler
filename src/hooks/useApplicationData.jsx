import {useEffect, useReducer, useRef} from 'react';
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from 'reducers/application';


export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
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
      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log('Message Received:', data);

        if (data.type === 'SET_INTERVIEW') {
          dispatch({type: SET_INTERVIEW, id: data.id, interview: data.interview})
        }
      };
    }

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((response) => {
      const [days, appointments, interviewers] = response;
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        }
      })
    }).catch((error) => console.log(error.message));
  }, [])

  const setDay = (day) => dispatch({type: SET_DAY, value: day});

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then((response) => dispatch({type: SET_INTERVIEW, id, interview}));
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => dispatch({type: SET_INTERVIEW, id, interview: null}));
  };

  return {state, setDay, bookInterview, cancelInterview}
}