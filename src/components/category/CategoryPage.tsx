import React, { useState, useEffect } from "react";
import { News, Category, Pagination } from "@/src/types";
import newsService from "@/src/services/newsService";
import NewsList from "@/src/components/news/NewsList";
import CategoryHeader from "./CategoryHeader";
import SortingFilter from "./SortingFilter";
import CategoryPagination from "../ui/CategoryPagination";

interface CategoryPageContentProps {
  slug: string;
  initialNews: News[];
  category?: Category;
  initialPagination?: Pagination;
}

const CategoryPageContent: React.FC<CategoryPageContentProps> = ({
  slug,
  initialNews,
  category,
  initialPagination,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [localNews, setLocalNews] = useState<News[]>(initialNews);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(initialPagination);

  const categoryName = category?.name || (slug as string)?.replace(/-/g, " ");
  const capitalizedCategoryName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "";

  // Sıralama değiştiğinde haberleri yeniden getir
  useEffect(() => {
    const fetchNews = async () => {
      if (!slug) return;

      setIsLoading(true);

      try {
        const params: any = {
          page: currentPage,
          limit: 10,
        };

        // Sıralama seçenekleri
        if (sortOption === "newest") {
          params.sort = "publishedAt";
          params.order = "DESC";
        } else if (sortOption === "oldest") {
          params.sort = "publishedAt";
          params.order = "ASC";
        }

        const response = await newsService.getNewsByCategory(
          slug as string,
          params
        );

        if (response.success) {
          setLocalNews(response.data || []);
          setPagination(response.pagination);
        }
      } catch (error) {
        console.error("Kategoriye ait haberler alınırken hata:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [slug, sortOption, currentPage]);

  // Sayfa değiştirme işlemi
  const handlePageChange = (page: number) => {
    if (page > 0 && (!pagination || page <= pagination.pages)) {
      setCurrentPage(page);
      // Sayfa başına gitmek için
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Kategori Başlığı ve Sıralama */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <CategoryHeader
          categoryName={capitalizedCategoryName}
          category={category}
        />
        <SortingFilter sortOption={sortOption} onSortChange={setSortOption} />
      </div>

      {/* Haberler Listesi */}
      <NewsList
        news={localNews}
        loading={isLoading}
        emptyMessage={`${capitalizedCategoryName} kategorisinde henüz haber bulunmuyor.`}
        layout="list"
      />

      {/* Sayfalama */}
      {pagination && pagination.pages > 1 && (
        <CategoryPagination
          currentPage={currentPage}
          totalPages={pagination.pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default CategoryPageContent;
