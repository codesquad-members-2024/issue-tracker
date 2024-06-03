import { useQuery } from "@tanstack/react-query";
import fetchData from "../utility/fetchData";

const useGet = (queryKey: string, query: string, enabled: boolean) =>
	useQuery({
		queryKey: [queryKey],
		queryFn: () => fetchData(query),
		enabled,
	});

export default useGet;
