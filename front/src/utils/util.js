/**
 * @ param {string} 2024-05-14T06:07:15.160190262
 * @ return {string} 3분전 / 1 시간 15분전
 */

function timestamp(createTime) {
	const currentTime = new Date();
	const targetTime = new Date(createTime);
	const diff = currentTime - targetTime;
	const diffSeconds = Math.floor(diff / 1000);
	const diffMinutes = Math.floor(diff / 1000 / 60);
	const diffHours = Math.floor(diff / 1000 / 60 / 60);

	return diffHours > 0
		? `${diffHours}시간 전`
		: diffMinutes > 0
		? `${diffMinutes}분 전`
		: `${diffSeconds}초 전`;
}

function colorGenerator() {
	const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
	return color;
}

export { timestamp, colorGenerator };
