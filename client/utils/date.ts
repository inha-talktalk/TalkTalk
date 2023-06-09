export function getDateDiff(date1: Date, date2: Date) {
  const diff = date1.getTime() - date2.getTime();

  return Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function getDateString(date: Date) {
  return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
    .getDate()
    .toString()
    .padStart(2, '0')}`;
}

export function getFullDateString(date: Date) {
  return `${getDateString(date)} ${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

export function getTimeDiffToString(date1: Date, date2: Date) {
  var diff = date2.getTime() - date1.getTime();

  var msec = diff;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  var ss = Math.floor(msec / 1000);
  msec -= ss * 1000;

  return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss
    .toString()
    .padStart(2, '0')}`;
}
