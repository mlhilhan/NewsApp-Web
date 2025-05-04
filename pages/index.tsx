import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { News } from "@/src/types";
import newsService from "@/src/services/newsService";
import NewsCard from "@/src/components/news/NewsCard";
import NewsList from "@/src/components/news/NewsList";
import { FiTrendingUp, FiClock } from "react-icons/fi";

interface HomeProps {
  featuredNews: News[];
  latestNews: News[];
  popularNews: News[];
  error?: string;
}

export default function Home({
  featuredNews,
  latestNews,
  popularNews,
  error,
}: HomeProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Haber Uygulaması - Ana Sayfa</title>
        <meta
          name="description"
          content="En güncel haberler, son dakika gelişmeleri ve daha fazlası"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Bir hata oluştu</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Öne Çıkan Haberler */}
          {featuredNews.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Öne Çıkan Haberler
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Ana Öne Çıkan Haber */}
                <div className="lg:col-span-2">
                  <NewsCard news={featuredNews[0]} variant="featured" />
                </div>

                {/* Diğer Öne Çıkan Haberler */}
                <div className="flex flex-col space-y-6">
                  {featuredNews.slice(1, 3).map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Son Haberler */}
          {latestNews.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FiClock className="mr-2" />
                  Son Haberler
                </h2>
                <a
                  href="/latest"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Tümünü Gör →
                </a>
              </div>

              <NewsList news={latestNews} layout="grid" perRow={3} />
            </section>
          )}

          {/* Popüler Haberler */}
          {popularNews.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FiTrendingUp className="mr-2" />
                  Popüler Haberler
                </h2>
                <a
                  href="/popular"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Tümünü Gör →
                </a>
              </div>

              <NewsList news={popularNews} layout="grid" perRow={4} />
            </section>
          )}
        </div>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Öne çıkan haberleri getir
    const featuredResponse = await newsService.getAllNews({
      limit: 5,
      sort: "publishedAt",
      order: "DESC",
    });

    // Son haberleri getir
    const latestResponse = await newsService.getAllNews({
      limit: 6,
      sort: "publishedAt",
      order: "DESC",
    });

    // Popüler haberleri getir (simülasyon için son eklenenlerden)
    const popularResponse = await newsService.getAllNews({
      limit: 8,
      sort: "publishedAt",
      order: "DESC",
    });

    return {
      props: {
        featuredNews: featuredResponse.success
          ? featuredResponse.data || []
          : [],
        latestNews: latestResponse.success ? latestResponse.data || [] : [],
        popularNews: popularResponse.success ? popularResponse.data || [] : [],
        error:
          !featuredResponse.success ||
          !latestResponse.success ||
          !popularResponse.success
            ? "Haberler yüklenirken bir hata oluştu"
            : undefined,
      },
    };
  } catch (error) {
    console.error("Ana sayfa veri getirme hatası:", error);
    return {
      props: {
        featuredNews: [],
        latestNews: [],
        popularNews: [],
        error: "Haberler yüklenirken bir hata oluştu",
      },
    };
  }
};
