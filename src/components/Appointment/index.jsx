import React, {useEffect} from 'react';

import 'components/Appointment/styles.scss';

// Custom Hook
import useVisualMode from 'hooks/useVisualMode';

import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const EDIT = 'EDIT';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';



export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);
  
  const onAdd = () => transition(CREATE);
  const onCancel = () => back();

  const onSave = (name, interviewer) => {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => transition(ERROR_SAVE, true));
  };

  const onDelete = () => {
    transition(CONFIRM);
  };
  
  const onConfirm = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(err => transition(ERROR_DELETE, true));
  }

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [props.interview, transition, mode]);


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && !props.interview && <Empty onAdd={onAdd} />}
      {mode === SHOW && props.interview &&(
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM && (
        <Confirm 
          onConfirm={onConfirm}
          onCancel={onCancel}
          message='Confirm to cancel appointment'
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message='Error saving appointment'
          onClose={onCancel}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message='Error deleting appointment'
          onClose={onCancel}
        />
      )}
    </article>
  )
}