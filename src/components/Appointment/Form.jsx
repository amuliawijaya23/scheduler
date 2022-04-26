import React, {useState} from 'react';

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {

  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const save = () => {
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            name="name"
            type="text"
            placeholder='Enter Student Name'
            className="appointment__create-input text--semi-bold"
            onChange={event =>  setStudent(event.target.value)}
            value={student}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => {setStudent(''); setInterviewer(null); props.onCancel()}}>
            Cancel
          </Button>
          <Button onClick={save} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};