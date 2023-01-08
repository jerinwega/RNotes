import { DARK_COLOR, LIGHT_COLOR } from '../../utils/constants';
import { useRef } from 'react';


const BOUNCE_RATE = 1000;


export const getDisabledBtnColor = (mode, isDisabled) => {
    let backBtnColor =  '';
    if (mode === 'light') {
      backBtnColor = DARK_COLOR;
    }
    if (mode === 'dark') {
      backBtnColor = LIGHT_COLOR;
    }
    if (mode === 'light' && isDisabled) {
      backBtnColor = '#a3a3a3';
    }
    if (mode === 'dark' && isDisabled) {
      backBtnColor = '#525252';
    }
    return backBtnColor;
}


export const isSameDayAndMonth = (d1,d2) => {
  return d1.date() === d2 .date() && d1.month() === d2.month()
}

export const useDebounce = () => {
  const busy = useRef(false);

  const debounce = async (callback) => {
    setTimeout(() => {
      busy.current = false;
    }, BOUNCE_RATE);

    if (!busy.current) {
      busy.current = true;
      callback();
    }
  };

  return { debounce };
};
