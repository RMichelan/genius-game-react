import './style.css';
import React from 'react';

// "Acende" o botão
export const turnOnButton = (event) => {
  event.target.style.opacity = 1;
};

export default function ButtonColor(props) {
  return <button {...props} />;
}
