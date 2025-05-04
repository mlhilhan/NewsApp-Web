import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { News, Category, Pagination } from "@/src/types";
import newsService from "@/src/services/newsService";
import NewsList from "@/src/components/news/NewsList";
import { FiTag, FiFilter, FiChevronDown } from "react-icons/fi";

interface CategoryPageProps {
  category?: Category;
  news: News[];
  pagination?: Pagination;
  error?: string;
}

export default function CategoryPage({
  category,
  news,
  pagination,
  error,
}: CategoryPageProps) {
  const router = useRouter();
  const { slug } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [localNews, setLocalNews] = useState<News[]>(news);
  const [currentPage, setCurrentPage] = useState(1);

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

        if (response.success && response.data) {
          setLocalNews(response.data);
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

  // Hata durumu
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-lg text-center">
        <h1 className="text-xl font-semibold mb-2">Bir hata oluştu</h1>
        <p>{error}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{capitalizedCategoryName} Haberleri - Haber Uygulaması</title>
        <meta
          name="description"
          content={`${capitalizedCategoryName} kategorisindeki en güncel haberler, son dakika gelişmeleri ve daha fazlası`}
        />
      </Head>

      <div className="space-y-6">
        {/* Kategori Başlığı */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FiTag className="mr-2" />
            {capitalizedCategoryName} Haberleri
          </h1>

          {/* Sıralama Seçenekleri */}
          <div className="relative">
            <button
              onClick={() => setShowSortOptions(!showSortOptions)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
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
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setSortOption("newest");
                      setShowSortOptions(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                      sortOption === "newest" ? "bg-blue-50 text-blue-700" : ""
                    }`}
                  >
                    En Yeni
                  </button>
                  <button
                    onClick={() => {
                      setSortOption("oldest");
                      setShowSortOptions(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                      sortOption === "oldest" ? "bg-blue-50 text-blue-700" : ""
                    }`}
                  >
                    En Eski
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Kategori Açıklaması */}
        {category?.description && (
          <div className="bg-blue-50 text-blue-800 p-4 rounded-md">
            <p>{category.description}</p>
          </div>
        )}

        {/* Haberler Listesi */}
        <NewsList
          news={localNews}
          loading={isLoading}
          emptyMessage={`${capitalizedCategoryName} kategorisinde henüz haber bulunmuyor.`}
          layout="list"
        />

        {/* Sayfalama */}
        {pagination && pagination.pages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-l-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Önceki
              </button>

              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                      p === currentPage
                        ? "bg-blue-50 text-blue-600 z-10"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-md ${
                  currentPage === pagination.pages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Sonraki
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  try {
    const slug = params?.slug;
    const page = query.page ? parseInt(query.page as string, 10) : 1;

    if (!slug || Array.isArray(slug)) {
      return {
        props: {
          news: [],
          error: "Geçersiz kategori",
        },
      };
    }

    // Kategori bilgisini getir
    const categoryResponse = await newsService.getAllCategories();
    const category =
      categoryResponse.success && categoryResponse.data
        ? categoryResponse.data.find((cat) => cat.slug === slug)
        : undefined;

    // Kategoriye ait haberleri getir
    const newsResponse = await newsService.getNewsByCategory(slug, {
      page,
      limit: 10,
      sort: "publishedAt",
      order: "DESC",
    });

    if (!newsResponse.success) {
      return {
        props: {
          category,
          news: [],
          error: newsResponse.message || "Haberler yüklenirken bir hata oluştu",
        },
      };
    }

    return {
      props: {
        category,
        news: newsResponse.data || [],
        pagination: newsResponse.pagination,
      },
    };
  } catch (error) {
    console.error("Kategori sayfası veri getirme hatası:", error);
    return {
      props: {
        news: [],
        error: "Kategori haberleri yüklenirken bir hata oluştu",
      },
    };
  }
};
