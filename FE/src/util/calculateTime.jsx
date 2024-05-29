export function calculateTime(timestamp) {
  const timestampDate = timestamp.substring(0, 10);
  const elapsedTime = new Date() - new Date(timestamp);
  const minutesElapsed = Math.floor(elapsedTime / 1000 / 60);
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  const daysElapsed = Math.floor(hoursElapsed / 24);

  if (daysElapsed > 7) {
    return `${timestampDate}`;
  }
  if (daysElapsed > 0) {
    return `${daysElapsed}일 전`;
  }
  if (hoursElapsed > 0) {
    return `${hoursElapsed}시간 전`;
  }
  if (minutesElapsed > 0) {
    return `${minutesElapsed}분 전`;
  }
  return `방금 전`;
}
