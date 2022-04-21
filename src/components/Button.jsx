import React from "react";
import classNames from 'classnames';

import 'components/styles/Button.scss';

export default function Button(props) {
   const {children, confirm, danger, onClick, disabled} = props;

   const buttonClass = classNames('button', {
      'button--confirm': confirm,
      'button--danger': danger
   });

   return (
      <button 
         disabled={disabled}
         onClick={onClick}
         className={buttonClass} 
      > 
         {children}
      </button>
   );
}
