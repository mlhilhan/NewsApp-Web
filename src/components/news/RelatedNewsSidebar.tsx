import React from "react";
import { News } from "@/src/types";
import NewsCard from "./NewsCard";

interface RelatedNewsSidebarProps {
  relatedNews: News[];
}

const RelatedNewsSidebar: React.FC<RelatedNewsSidebarProps> = ({
  relatedNews,
}) => {
  if (relatedNews.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        İlgili Haberler
      </h3>

      <div className="space-y-3">
        {relatedNews.map((news) => (
          <NewsCard key={news.id} news={news} variant="compact" />
        ))}
      </div>
    </div>
  );
};

export default RelatedNewsSidebar;
