import React from 'react';

import DayListItem from './DayListItem';

export default function DayList(props) {
  const {days, value, onChange} = props;
  
  const dayListItems = days.map((day) => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === value}
        setDay={(event) => onChange(value)}
      />
    )
  })

  return (
    <ul>
      {dayListItems}
    </ul>
  )
}