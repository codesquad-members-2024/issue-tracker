import { InputSelect } from '~/common/components';
export function InputSelectGroup({
	type,
	listName,
	value,
	src,
	onChange,
	checked,
}) {
	return (
		<>
			<InputSelect
				type={type}
				listName={listName}
				value={value}
				src={src}
				checked={checked}
				onChange={onChange}
			/>
		</>
	);
}
