import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchData from "../API/fetchData";

const useDelete = (query: string, queryKey: string) => {
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: () => fetchData(query, { method: "DELETE" }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [queryKey] });
		},
		onError: (e) => {
			console.error("삭제 에러", e);
		},
	});
	return mutate;
};

export default useDelete;
