import Button from "../../common/Button";
import usePatch from "../../../hooks/usePatch";

interface PropsType {
	id: number;
	state: boolean;
	queryKey: string;
}
function StateButton({ state, id, queryKey }: PropsType) {
	const query = state ? "close" : "open";
	const mutate = usePatch(`/milestone/${id}/${query}`, queryKey);
	const handleToggleState = () => mutate();

	return (
		<>
			{state ? (
				<Button
					onClick={handleToggleState}
					size="S"
					type="GHOST"
					icon="ARCHIVE"
					text="닫기"
					state="DEFAULT"
				/>
			) : (
				<Button
					onClick={handleToggleState}
					size="S"
					type="GHOST"
					icon="ARCHIVE"
					text="열기 "
					state="DEFAULT"
				/>
			)}
		</>
	);
}

export default StateButton;
