import React from 'react';

import DayListItem from './DayListItem';

export default function DayList(props) {
  const {days, day, setDay} = props;
  
  const dayListItems = days.map((item) => {
    return (
      <DayListItem 
        key={item.id}
        name={item.name}
        spots={item.spots}
        selected={item.name === day}
        setDay={setDay}
      />
    )
  })

  return (
    <ul>
      {dayListItems}
    </ul>
  )
}