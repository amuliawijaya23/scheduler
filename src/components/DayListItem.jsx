import React from 'react';
import classNames from 'classnames';

import 'components/DayListItem.scss'

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0
  });

  const FormatSpots = function() {
    
    return (
      <>
      {spots > 0 && <>{spots} {(spots > 1) ? 'spots' : 'spot'} remaining</>}
      {spots === 0 && <>no spots remaining</>}
      </>
    )
  }

  return (
    <li onClick={() => setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text-light"><FormatSpots /></h3>
    </li>
  );
};