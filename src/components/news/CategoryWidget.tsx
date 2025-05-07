import React from "react";
import Link from "next/link";

interface CategoryWidgetProps {
  category?: string;
}

const CategoryWidget: React.FC<CategoryWidgetProps> = ({ category }) => {
  if (!category) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        Kategori
      </h3>
      <Link
        href={`/category/${encodeURIComponent(category.toLowerCase())}`}
        className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800/40"
      >
        {category}
      </Link>
    </div>
  );
};

export default CategoryWidget;
