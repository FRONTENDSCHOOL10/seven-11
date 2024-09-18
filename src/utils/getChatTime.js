export function getChatTime(isoTime) {
  const date = new Date(isoTime);

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? '오후' : '오전';

  hours = hours % 12 || 12;

  const chatMinutes = minutes.toString().padStart(2, '0');

  return `${period} ${hours}:${chatMinutes}`;
}

export function getChatUpdateTime(isoTime) {
  const date = new Date(isoTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

export function getChatNoticeTime(isoTime) {
  const date = new Date(isoTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes} ${period}`;
}

export function getDateNumber(isoString) {
  const date = new Date(isoString);

  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };
}
