// src/components/news/NewsList.tsx
import React from "react";
import NewsCard from "./NewsCard";
import { News } from "@/src/types";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

interface NewsListProps {
  news: News[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  layout?: "grid" | "list";
  perRow?: 2 | 3 | 4;
  showSaveButtons?: boolean;
  savedNewsIds?: number[];
  onSaveToggle?: (id: number) => void;
}

const NewsList: React.FC<NewsListProps> = ({
  news,
  loading = false,
  error = null,
  emptyMessage = "Gösterilecek haber bulunamadı.",
  layout = "grid",
  perRow = 3,
  showSaveButtons = false,
  savedNewsIds = [],
  onSaveToggle,
}) => {
  // Satır başına kart sayısına göre grid sınıfı
  const gridColsClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[perRow];

  // Yükleniyor durumu
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 rounded-full border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Haberler yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-8 rounded-xl flex flex-col items-center justify-center text-center">
        <FiAlertCircle size={40} className="mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          Haberler yüklenirken bir hata oluştu
        </h3>
        <p className="mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
        >
          <FiRefreshCw className="mr-2" /> Tekrar Dene
        </button>
      </div>
    );
  }

  // Boş durum
  if (news.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-12 rounded-xl flex flex-col items-center justify-center text-center">
        <svg
          className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  // Liste görünümü
  if (layout === "list") {
    return (
      <div className="flex flex-col space-y-6">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            news={item}
            variant="horizontal"
            showSaveButton={showSaveButtons}
            isSaved={savedNewsIds.includes(item.id)}
            onSave={onSaveToggle}
          />
        ))}
      </div>
    );
  }

  // Grid görünümü (varsayılan)
  return (
    <div className={`grid grid-cols-1 ${gridColsClass} gap-6`}>
      {news.map((item) => (
        <NewsCard
          key={item.id}
          news={item}
          variant="default"
          showSaveButton={showSaveButtons}
          isSaved={savedNewsIds.includes(item.id)}
          onSave={onSaveToggle}
        />
      ))}
    </div>
  );
};

export default NewsList;
