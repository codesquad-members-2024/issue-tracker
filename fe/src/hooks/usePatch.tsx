import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchData from "../API/fetchData";

interface MilestoneDataType {
	name: string;
	description: string;
	completeDate: string;
}

type MutateType = (data?: MilestoneDataType) => void;

const usePatch = (query: string, queryKey: string, handler?: () => void) => {
	const queryClient = useQueryClient();
	const { mutate }: { mutate: MutateType } = useMutation({
		mutationFn: (data?: MilestoneDataType) => fetchData(query, { method: "PATCH", body: data }),
		onSuccess: () => {
			if (handler) handler();
			queryClient.invalidateQueries({ queryKey: [queryKey] });
		},
		onError: (e) => {
			console.error("업데이트 에러", e);
		},
	});
	return mutate;
};

export default usePatch;
