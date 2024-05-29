function getLocalStorageItem(key: string) {
	const userItem = localStorage.getItem(key);
	if (userItem) return JSON.parse(userItem);
}

export default getLocalStorageItem;
