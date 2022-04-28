import {useEffect, useReducer, useRef} from 'react';
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from 'reducers/application';


export default function useApplicationData() {
  // set reducer with initial state
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  // using useRef to declare ws outside useEffect
  const ws = useRef(0);
  
  useEffect(() => {
    // create in websocket in ws.current
    ws.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    ws.current.onopen = () => {

      // grabs event data from server and update state with received data
      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data);

        if (data.type === 'SET_INTERVIEW') {
          dispatch({type: SET_INTERVIEW, id: data.id, interview: data.interview})
        }
      };
    }

    // grab api data and set new state with the data received
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
    })
  }, [])

  const setDay = (day) => dispatch({type: SET_DAY, value: day});

  // send put request to book new interview
  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => dispatch({type: SET_INTERVIEW, id, interview}));
  };

  // send delete request to cancel interview
  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => dispatch({type: SET_INTERVIEW, id, interview: null}));
  };

  return {state, setDay, bookInterview, cancelInterview}
}