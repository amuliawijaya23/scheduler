import React, {useState} from 'react';

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {

  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  const validate = () => {
    if (student === '') {
      setError('student name cannot be blank');
      return;
    }

    if (interviewer === null) {
      setError('please select an interviewer');
      return;
    }

    setError(null);
    props.onSave(student, interviewer);
  }

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
            data-testid="student-name-input"
          />
          <section className='appointment__validation'>{error}</section>
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
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};