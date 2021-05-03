import React from "react";

function PaginationComponent({ total, pageSize, page, setPage }) {
	const totalPages =
		total % pageSize !== 0
			? Math.floor(total / pageSize) + 1
			: Math.floor(total / pageSize);
	const pages = new Array(totalPages).fill(1);
	return (
		<div>
			<button
				className="btn btn-light"
				hidden={page == 1}
				onClick={() => setPage(1)}
			>
				&lt;&lt;
			</button>
			{pages.map((p, i) => (
				<button
					key={i}
					className={page == i + 1 ? "btn btn-primary" : "btn btn-light"}
					onClick={() => setPage(i + 1)}
				>
					{i + 1}
				</button>
			))}
			<button
				className="btn btn-light"
				hidden={page == totalPages}
				onClick={() => setPage(totalPages)}
			>
				&gt;&gt;
			</button>
		</div>
	);
}

export default PaginationComponent;
