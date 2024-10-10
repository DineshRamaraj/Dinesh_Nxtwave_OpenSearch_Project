import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        currentPage - 1 === i ||
        currentPage === i ||
        currentPage + 1 === i ||
        i === 1 ||
        i === totalPages
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`mx-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md border text-[12px] sm:text-[14px] ${
              currentPage === i
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            } transition duration-300 ease-in-out`}
          >
            {i}
          </button>
        );
      } else {
        if (
          (totalPages > 2 && i - 2 === currentPage) ||
          currentPage - 2 === i
        ) {
          pages.push(
            <button
              key={i}
              type="button"
              className="mx-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-md border text-gray-700 cursor-default text-[10px] sm:text-[14px]"
              disabled={true}
            >
              ...
            </button>
          );
        }
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-4 font-[roboto]">
      {totalItems > 9 && (
        <span className="hidden sm:block sm:text-[12px]">
          {((currentPage - 1) * itemsPerPage) + 1} TO {(currentPage * itemsPerPage) < totalItems ? currentPage * itemsPerPage : totalItems} OF {" "}
          {totalItems}
        </span>
      )}
      {totalItems > itemsPerPage && (
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-2 py-1 sm:px-3.5 sm:py-2 rounded-md border text-[12px] sm:text-[14px] ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          } transition duration-300 ease-in-out`}
        >
         &lt;
        </button>
      )}
      {totalItems > itemsPerPage && renderPageNumbers()}
      {totalItems > itemsPerPage && (
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 sm:px-3.5 sm:py-2 rounded-md border text-[12px] sm:text-[14px] ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          } transition duration-300 ease-in-out`}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
