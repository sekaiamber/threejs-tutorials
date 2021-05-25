/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import config from '../webpack/config.json';

export function staticProxy(url) {
  let surl = url;
  if (url[0] !== '/') surl = '/' + surl;
  return `${config.STATIC_PROXY}${surl}`;
}
