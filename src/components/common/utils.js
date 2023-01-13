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


export const convertHTMLtoPlainText = (html) => {

html = html.replace(/\n/gi, "");
html = html.replace(/<style([\s\S]*?)<\/style>/gi, "");
html = html.replace(/<script([\s\S]*?)<\/script>/gi, "");
html = html.replace(/<a.*?href="(.*?)[\?\"].*?>(.*?)<\/a.*?>/gi, " $2 $1 ");
html = html.replace(/<\/div>/gi, "\n\n");
html = html.replace(/<\/li>/gi, "\n");
html = html.replace(/<li.*?>/gi, "  *  ");
html = html.replace(/<\/ul>/gi, "\n\n");
html = html.replace(/<\/p>/gi, "\n\n");
html = html.replace(/<br\s*[\/]?>/gi, "\n");
html = html.replace(/<[^>]+>/gi, "");
html = html.replace(/^\s*/gim, "");
html = html.replace(/ ,/gi, ",");
html = html.replace(/ +/gi, " ");
html = html.replace(/\n+/gi, "\n\n");
html = html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

return html;
}
