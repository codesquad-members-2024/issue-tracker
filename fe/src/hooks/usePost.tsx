import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchData from "../utility/fetchData";

interface MilestoneDataType {
	name: string;
	description: string;
	completeDate: string;
}

const usePost = (query: string, queryKey: string, handler: () => void) => {
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: (data: MilestoneDataType) => fetchData(query, { method: "POST", body: data }),
		onSuccess: () => {
			handler();
			queryClient.invalidateQueries({ queryKey: [queryKey] });
		},
		onError: (e) => {
			console.error("생성에러", e);
		},
	});
	return mutate;
};

export default usePost;
