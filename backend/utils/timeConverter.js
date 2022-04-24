const moment = require('moment');

module.exports = hoursToMinutesConverter = () => {
  const now = new moment();
  let hours = now.format('HH:mm');
  const arrSplit = hours.split(':');
  return +arrSplit[0] * 60 + +arrSplit[1];
};
