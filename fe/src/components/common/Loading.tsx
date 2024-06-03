const circle = "fixed top-0 left-0 z-20 w-[13px] h-[13px] bg-grayscale.700 rounded-full";
const base = "fixed top-0 left-0 w-screen h-screen";

function Loading() {
	return (
		<>
			<section className={`${base}`}>
				<div className="fixed z-10 bg-red-200 inset-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<div className={`animate-circle ${circle}`}></div>
					<div className={`${circle}`}></div>
					<div className={`animate-circleReverse ${circle}`}></div>
				</div>
			</section>
			<section className={`blur-sm ${base}`}></section>
		</>
	);
}

export default Loading;
