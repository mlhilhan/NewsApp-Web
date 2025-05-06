import React from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  maxPageButtons?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
  maxPageButtons = 5,
}) => {
  // Sayfalama görüntülenecek sayfa numaralarını hesapla
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= maxPageButtons) {
      // Toplam sayfa sayısı maxPageButtons'tan küçükse tüm sayfaları göster
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Başa her zaman 1. sayfayı ekle
      pageNumbers.push(1);

      // Eğer mevcut sayfa 3'ten büyükse "..." ekle
      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      // Mevcut sayfanın etrafındaki sayfaları göster
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Eğer mevcut sayfa totalPages-2'den küçükse "..." ekle
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      // Sona her zaman son sayfayı ekle
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <nav className="flex justify-center my-8" aria-label="Sayfalama">
      <ul className="flex space-x-1">
        {/* Önceki Sayfa */}
        <li>
          <Link
            href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : "#"}
            className={`w-10 h-10 flex items-center justify-center rounded-md border ${
              currentPage > 1
                ? "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                : "border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            } transition`}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : 0}
          >
            <FiChevronLeft size={18} aria-hidden="true" />
            <span className="sr-only">Önceki sayfa</span>
          </Link>
        </li>

        {/* Sayfa Numaraları */}
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {typeof page === "number" ? (
              <Link
                href={`${baseUrl}?page=${page}`}
                className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 dark:border-blue-600"
                    : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Link>
            ) : (
              <span className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400">
                {page}
              </span>
            )}
          </li>
        ))}

        {/* Sonraki Sayfa */}
        <li>
          <Link
            href={
              currentPage < totalPages
                ? `${baseUrl}?page=${currentPage + 1}`
                : "#"
            }
            className={`w-10 h-10 flex items-center justify-center rounded-md border ${
              currentPage < totalPages
                ? "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                : "border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            } transition`}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : 0}
          >
            <FiChevronRight size={18} aria-hidden="true" />
            <span className="sr-only">Sonraki sayfa</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
