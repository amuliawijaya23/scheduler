import React, { useState } from 'react';
import classNames from 'classnames';

import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const {name, avatar, selected, setInterviewer} = props;

  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected
  })

  return (
    <li onClick={setInterviewer} className={interviewerClass}>
      <img src={avatar} alt={name} className="interviewers__item-image" />
      {selected && name}
    </li>
  );
};