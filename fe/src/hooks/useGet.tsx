import { useQuery } from "@tanstack/react-query";
import fetchData from "../utility/fetchData";

const useGet = (queryKey: string, query: string) =>
	useQuery({
		queryKey: [queryKey],
		queryFn: () => fetchData(query),
		enabled: false,
	});

export default useGet;
