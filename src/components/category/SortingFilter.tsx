import React, { useState } from "react";
import { FiFilter, FiChevronDown } from "react-icons/fi";

interface SortingFilterProps {
  sortOption: string;
  onSortChange: (option: string) => void;
}

const SortingFilter: React.FC<SortingFilterProps> = ({
  sortOption,
  onSortChange,
}) => {
  const [showSortOptions, setShowSortOptions] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowSortOptions(!showSortOptions)}
        className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <FiFilter size={16} />
        <span>
          {sortOption === "newest"
            ? "En Yeni"
            : sortOption === "oldest"
            ? "En Eski"
            : "Sırala"}
        </span>
        <FiChevronDown size={16} />
      </button>

      {showSortOptions && (
        <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-100 dark:border-gray-700">
          <div className="py-1">
            <button
              onClick={() => {
                onSortChange("newest");
                setShowSortOptions(false);
              }}
              className={`block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                sortOption === "newest"
                  ? "bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                  : ""
              }`}
            >
              En Yeni
            </button>
            <button
              onClick={() => {
                onSortChange("oldest");
                setShowSortOptions(false);
              }}
              className={`block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                sortOption === "oldest"
                  ? "bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                  : ""
              }`}
            >
              En Eski
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingFilter;
