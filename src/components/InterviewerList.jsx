import React, {useState} from 'react';
import InterviewerListItem from './InterviewerListItem';

import 'components/styles/InterviewerList.scss';

export default function InterviewerList(props) {
  const {interviewers, value, onChange} = props;

  const interviewerListItems = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={(event) => onChange(interviewer.id)}
      />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListItems}
      </ul>
    </section>
  );
};