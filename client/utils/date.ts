export function getDateDiff(date1: Date, date2: Date) {
  const diff = date1.getTime() - date2.getTime();

  return Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));
}
