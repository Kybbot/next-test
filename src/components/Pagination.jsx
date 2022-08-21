import React from "react";
import Link from "next/link";

const Pagination = ({ pages, currentPage, changePage, prevPageHandler, nextPageHandler }) => {
	const pagesCount = React.useMemo(() => {
		const arr = [];

		for (let i = 1; i <= pages; i++) {
			arr.push(i);
		}

		return arr;
	}, [pages]);

	const pageNumbersElements = React.useMemo(() => {
		let tempNumberOfPages = [];

		if (pages < 6) {
			tempNumberOfPages = pagesCount;
		} else if (currentPage >= 1 && currentPage <= 3) {
			tempNumberOfPages = [1, 2, 3, 4, null, pagesCount.length];
		} else if (currentPage === 4) {
			const sliced = pagesCount.slice(0, 5);
			tempNumberOfPages = [...sliced, null, pagesCount.length];
		} else if (currentPage > 4 && currentPage < pagesCount.length - 2) {
			const sliced1 = pagesCount.slice(currentPage - 2, currentPage + 1);
			tempNumberOfPages = [1, null, ...sliced1, null, pagesCount.length];
		} else if (currentPage > pagesCount.length - 3) {
			const sliced = pagesCount.slice(pagesCount.length - 4);
			tempNumberOfPages = [1, null, ...sliced];
		}

		return tempNumberOfPages.map((item, index) =>
			item === null ? (
				<div key={`${item}-${index}`} className="pagination__number pagination__disable">
					...
				</div>
			) : (
				<Link href={`${item === 1 ? "/" : `?page=${item}`}`} key={item}>
					<a
						className={`${
							Number(currentPage) === item ? "pagination__number pagination__number--active" : "pagination__number"
						}`}
						onClick={() => changePage(item)}
					>
						{item}
					</a>
				</Link>
			)
		);
	}, [currentPage, pages, pagesCount, changePage]);

	return (
		<div className="pagination">
			<Link href={`${currentPage === 1 || currentPage - 1 === 1 ? "/" : `?page=${currentPage - 1}`}`}>
				<a className={`pagination__left ${currentPage === 1 ? "pagination__disable" : ""}`} onClick={prevPageHandler}>
					&#60;
				</a>
			</Link>
			<div className="pagination__numbers">{pageNumbersElements}</div>
			<Link href={`${currentPage === pages ? `?page=${pages}` : `?page=${currentPage + 1}`}`}>
				<a
					className={`pagination__right ${currentPage === pages ? "pagination__disable" : ""}`}
					onClick={nextPageHandler}
				>
					&#62;
				</a>
			</Link>
		</div>
	);
};

export default Pagination;
