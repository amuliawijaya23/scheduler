import React from 'react';

import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

// Custom Hook
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';

export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);
  
  const onAdd = () => transition(CREATE);
  const onCancel = () => back();

  const onSave = (name, interviewer) => {
    transition(SAVING, true);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => console.log(err.message));
  };

  const onDelete = () => {
    transition(CONFIRM);
  };
  
  const onConfirm = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(err => console.log(err.message));
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM && (
        <Confirm 
          onConfirm={onConfirm}
          message='Confirm to cancel appointment'
        />
      )}
    </article>
  )
}