import React from 'react';

type PaginationProps = {
currentPage: number;
lastPage: number;
onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, lastPage, onPageChange }) => {
const getPageNumbers = () => {
    const pages: number[] = [];

    for (let i = 1; i <= lastPage; i++) {
    if (
        i === 1 ||
        i === lastPage ||
        (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
        pages.push(i);
    }
    }

    return pages;
};

const pageNumbers = getPageNumbers();
const showLeftEllipsis = currentPage > 4;
const showRightEllipsis = currentPage < lastPage - 3;

return (
    <div className="mt-4 flex justify-center gap-2">
    <button
        className="btn btn-sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
    >
        Prev
    </button>

    {pageNumbers.map((page, index) => {
        if (page === 1 && showLeftEllipsis) {
        return (
            <React.Fragment key="start">
            <button
                className={`btn btn-sm ${currentPage === 1 ? 'btn-active' : ''}`}
                onClick={() => onPageChange(1)}
            >
                1
            </button>
            <span className="px-2">...</span>
            </React.Fragment>
        );
        }

        if (page === lastPage && showRightEllipsis) {
        return (
            <React.Fragment key="end">
            <span className="px-2">...</span>
            <button
                className={`btn btn-sm ${currentPage === lastPage ? 'btn-active' : ''}`}
                onClick={() => onPageChange(lastPage)}
            >
                {lastPage}
            </button>
            </React.Fragment>
        );
        }

        return (
        <button
            key={page}
            className={`btn btn-sm ${currentPage === page ? 'btn-active' : ''}`}
            onClick={() => onPageChange(page)}
        >
            {page}
        </button>
        );
    })}

    <button
        className="btn btn-sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
    >
        Next
    </button>
    </div>
);
};

export default Pagination;
