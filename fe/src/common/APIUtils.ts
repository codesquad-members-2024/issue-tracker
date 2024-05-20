import { FormState } from "../components/LabelsMilestones/Milestones/MilestoneEditUI";
const serverURL = import.meta.env.VITE_API_URL;

export const APiUtil = {
    async getData(tableName: string) {
        const response = await fetch(serverURL + tableName);
        const data = await response.json();
        return data;
    },

    async createData(tableName: string, createData: FormState) {
        console.log(serverURL + tableName)
        console.log({...createData})
        await fetch(serverURL + tableName, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                title: createData.title,
                description: createData.description,
                dueDate: createData.dueDate
            }),
        });
    },
};
