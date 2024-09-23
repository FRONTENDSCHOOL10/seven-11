export const formatTime = (time24) => {
  const [hour, minute] = time24.split(':');
  let hours = parseInt(hour);
  const isPM = hours >= 12;
  hours = hours % 12 || 12;
  const suffix = isPM ? 'PM' : 'AM';
  return `${hours}:${minute} ${suffix}`;
};
