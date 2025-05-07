import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CategoryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CategoryPagination: React.FC<CategoryPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Sayfa numaralarını akıllı bir şekilde sınırlama
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    // Toplam sayfa sayısı 7'den azsa tüm sayfaları göster
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // İlk sayfayı her zaman göster
      pageNumbers.push(1);

      // Mevcut sayfa 4'ten büyükse "..." ekle
      if (currentPage > 4) {
        pageNumbers.push("...");
      }

      // Mevcut sayfanın etrafındaki sayfaları göster
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        if (i < totalPages) {
          pageNumbers.push(i);
        }
      }

      // Mevcut sayfa (totalPages - 3)'ten küçükse "..." ekle
      if (currentPage < totalPages - 3) {
        pageNumbers.push("...");
      }

      // Son sayfayı her zaman göster
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex items-center space-x-1">
        {/* Önceki Sayfa Düğmesi */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative flex items-center justify-center w-10 h-10 rounded-md ${
            currentPage === 1
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          } border border-gray-300 dark:border-gray-700`}
          aria-label="Önceki sayfa"
        >
          <FiChevronLeft size={20} />
        </button>

        {/* Sayfa Numaraları */}
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === "number" ? (
              <button
                onClick={() => onPageChange(page)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-md ${
                  page === currentPage
                    ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 z-10 font-medium"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                } border border-gray-300 dark:border-gray-700`}
                aria-label={`Sayfa ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ) : (
              <span className="flex items-center justify-center text-gray-500 dark:text-gray-400 w-8">
                ...
              </span>
            )}
          </React.Fragment>
        ))}

        {/* Sonraki Sayfa Düğmesi */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative flex items-center justify-center w-10 h-10 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          } border border-gray-300 dark:border-gray-700`}
          aria-label="Sonraki sayfa"
        >
          <FiChevronRight size={20} />
        </button>
      </nav>
    </div>
  );
};

export default CategoryPagination;
