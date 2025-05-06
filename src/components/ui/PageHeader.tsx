import React from "react";
import { FiGrid, FiList } from "react-icons/fi";

interface PageHeaderProps {
  title: string;
  description?: string;
  selectedLayout?: "grid" | "list";
  onLayoutChange?: (layout: "grid" | "list") => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  selectedLayout,
  onLayoutChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>

        {selectedLayout && onLayoutChange && (
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 self-start">
            <button
              onClick={() => onLayoutChange("grid")}
              className={`p-2 rounded ${
                selectedLayout === "grid"
                  ? "bg-white dark:bg-gray-600 shadow-sm"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              aria-label="Izgara görünümü"
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => onLayoutChange("list")}
              className={`p-2 rounded ${
                selectedLayout === "list"
                  ? "bg-white dark:bg-gray-600 shadow-sm"
                  : "text-gray-600 dark:text-gray-300"
              }`}
              aria-label="Liste görünümü"
            >
              <FiList size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
