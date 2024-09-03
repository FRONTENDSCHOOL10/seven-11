export const getTimeDifference = (created) => {
  const now = new Date();
  const createdTime = new Date(created);
  const diff = now - createdTime;
  const diffMin = Math.floor(diff / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 60) {
    return `${diffMin}분 전`;
  } else if (diffHr < 24) {
    return `${diffHr}시간 전`;
  } else {
    return `${diffDay}일 전`;
  }
};
