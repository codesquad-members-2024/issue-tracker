import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchData from "../utility/fetchData";

const useDelete = (query: string, queryKey: string) => {
	const [labelOrMilestone] = queryKey.split("?");
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: () => fetchData(query, { method: "DELETE" }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKey] });
			if (labelOrMilestone === "milestone" || labelOrMilestone === "label")
				queryClient.invalidateQueries({ queryKey: ["count"] });
		},
		onError: (e) => {
			console.error("삭제 에러", e);
		},
	});
	return mutate;
};

export default useDelete;
