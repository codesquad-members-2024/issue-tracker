import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchData from "../utility/fetchData";

interface MilestonePatchDataType {
	name: string;
	description: string;
	completeDate: string;
}

interface LabelPatchDataType {
	name: string;
	description: string;
	backgroundColor: string;
	textBright: boolean;
}

interface IssueStateDataType {
	issueIds: number[];
}

interface IssueDetailDataType {
	[key: string]: string | null | string[] | number[];
}

type MutateType = (data?: DataType) => void;
type DataType =
	| MilestonePatchDataType
	| LabelPatchDataType
	| IssueStateDataType
	| IssueDetailDataType;

const usePatch = (query: string, queryKey: string, handler?: () => void) => {
	const queryClient = useQueryClient();
	const { mutate }: { mutate: MutateType } = useMutation({
		mutationFn: (data?: DataType) => fetchData(query, { method: "PATCH", body: data }),
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
