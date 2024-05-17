const serverURL = import.meta.env.VITE_API_URL;

export const APiUtil = {
    async getData(tableName: string) {
        const news = await fetch(serverURL + tableName);
        const data = await news.json();
        return data;
    },
}