import React from 'react';
import classNames from 'classnames';

import 'components/Appointment/styles.scss';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {
  const {time, interview, onAdd} = props;

  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty onAdd={onAdd} />}
    </article>
  )
}