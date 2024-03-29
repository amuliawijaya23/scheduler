import React from 'react';

import DayListItem from './DayListItem';

export default function DayList(props) {
  
  // create and return dayListItem for every available day
  const dayListItems = props.days.map((day) => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={(event) => props.onChange(day.name)}
      />
    )
  })

  return (
    <ul>
      {dayListItems}
    </ul>
  )
}