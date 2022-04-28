import React from 'react';
import classNames from 'classnames';

import 'components/styles/DayListItem.scss'

export default function DayListItem(props) {

  // className declaration for default, selected, and full state
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  return (
    <li data-testid={'day'} onClick={props.setDay} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text-light">
        {props.spots > 0 && <>{props.spots} {(props.spots > 1) ? 'spots' : 'spot'} remaining</>}
        {props.spots === 0 && <>no spots remaining</>}
      </h3>
    </li>
  );
};