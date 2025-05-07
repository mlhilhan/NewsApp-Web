import React from "react";
import { FiTag } from "react-icons/fi";
import { Category } from "@/src/types";

interface CategoryHeaderProps {
  categoryName: string;
  category?: Category;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categoryName,
  category,
}) => {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
        <FiTag className="mr-2" />
        {categoryName} Haberleri
      </h1>

      {/* Kategori Açıklaması */}
      {category?.description && (
        <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 p-4 rounded-md">
          <p>{category.description}</p>
        </div>
      )}
    </div>
  );
};

export default CategoryHeader;
