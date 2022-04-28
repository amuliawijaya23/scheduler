import React from 'react';
import classNames from 'classnames';

import 'components/styles/InterviewerListItem.scss'

export default function InterviewerListItem(props) {

  // add className for selected interviewer
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  })

  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
      <img src={props.avatar} alt={props.name} className="interviewers__item-image" />
      {props.selected && props.name}
    </li>
  );
};