import React from 'react';

import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';

// Custom Hook
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';

export default function Appointment(props) {
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    transition(SAVING, true);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => console.log(err.message));
  };

  const onAdd = () => transition(CREATE);
  const onCancel = () => back();

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={onCancel} onSave={save} />}
      {mode === SAVING && <Status message='Saving' />}
    </article>
  )
}