import React from "react";
import NewsCard from "./NewsCard";
import { News } from "@/src/types";
import { FiAlertCircle } from "react-icons/fi";

interface NewsListProps {
  news: News[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  layout?: "grid" | "list";
  perRow?: 2 | 3 | 4;
}

const NewsList: React.FC<NewsListProps> = ({
  news,
  loading = false,
  error = null,
  emptyMessage = "Gösterilecek haber bulunamadı.",
  layout = "grid",
  perRow = 3,
}) => {
  // Satır başına kart sayısına göre grid sınıfı
  const gridColsClass = {
    2: "sm:grid-cols-1 md:grid-cols-2",
    3: "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[perRow];

  // Yükleniyor durumu
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-lg flex flex-col items-center justify-center text-center">
        <FiAlertCircle size={40} className="mb-4" />
        <h3 className="text-lg font-semibold mb-2">
          Haberler yüklenirken bir hata oluştu
        </h3>
        <p>{error}</p>
      </div>
    );
  }

  // Boş durum
  if (news.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-12 rounded-lg flex flex-col items-center justify-center text-center">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
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
      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {item.imageUrl && (
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-5 md:w-2/3">
                <NewsCard news={item} variant="default" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Grid görünümü (varsayılan)
  return (
    <div className={`grid ${gridColsClass} gap-6`}>
      {news.map((item) => (
        <div key={item.id}>
          <NewsCard news={item} variant="default" />
        </div>
      ))}
    </div>
  );
};

export default NewsList;
