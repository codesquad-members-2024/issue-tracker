import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchData from "../utility/fetchData";

interface MilestonePostDataType {
	name: string;
	description: string;
	completeDate: string;
}

interface LabelPostDataType {
	name: string;
	description: string;
	backgroundColor: string;
	textBright: boolean;
}

interface IssueDataType {
	title: string;
	writer: string;
	content: string;
	createdAt: string;
	file: null;
	milestoneId: number | null;
	labelIds: number[];
	assigneeIds: string[];
}

interface ResponseType {
	[key: string]: number | string;
}

type DataType = MilestonePostDataType | LabelPostDataType | IssueDataType;
type Handler = (data?: ResponseType) => void;

const usePost = (query: string, queryKey: string, handler: Handler) => {
	const [labelOrMilestone] = queryKey.split("?");
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: (data: DataType) => fetchData(query, { method: "POST", body: data }),
		onSuccess: (data) => {
			handler(data);
			queryClient.invalidateQueries({ queryKey: [queryKey] });
			if (labelOrMilestone === "milestone" || labelOrMilestone === "label")
				queryClient.invalidateQueries({ queryKey: ["count"] });
		},
		onError: (e) => {
			console.error("생성에러", e);
		},
	});
	return mutate;
};

export default usePost;
