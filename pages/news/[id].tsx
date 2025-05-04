import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { News } from "@/src/types";
import newsService from "@/src/services/newsService";
import NewsDetail from "@/src/components/news/NewsDetail";
import NewsCard from "@/src/components/news/NewsCard";

interface NewsDetailPageProps {
  news: News;
  relatedNews: News[];
  error?: string;
}

export default function NewsDetailPage({
  news,
  relatedNews,
  error,
}: NewsDetailPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Sayfa henüz yüklenmediyse ve error yoksa
  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Hata durumu
  if (error || !news) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-lg text-center">
        <h1 className="text-xl font-semibold mb-2">Haber bulunamadı</h1>
        <p>{error || "İstenen haber bulunamadı veya kaldırılmış olabilir."}</p>
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
        <title>{news.title} - Haber Uygulaması</title>
        <meta name="description" content={news.content?.substring(0, 160)} />
        <meta property="og:title" content={news.title} />
        <meta
          property="og:description"
          content={news.content?.substring(0, 160)}
        />
        {news.imageUrl && <meta property="og:image" content={news.imageUrl} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ana İçerik */}
        <div className="lg:col-span-2">
          <NewsDetail news={news} />
        </div>

        {/* Yan Panel */}
        <div className="space-y-6">
          {/* İlgili Haberler */}
          {relatedNews.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                İlgili Haberler
              </h3>

              <div className="space-y-3">
                {relatedNews.map((relatedNews) => (
                  <NewsCard
                    key={relatedNews.id}
                    news={relatedNews}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Kategori Bilgisi */}
          {news.category && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Kategori
              </h3>
              <a
                href={`/category/${encodeURIComponent(
                  news.category.toLowerCase()
                )}`}
                className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200"
              >
                {news.category}
              </a>
            </div>
          )}

          {/* Kaynak Bilgisi */}
          {news.source && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Kaynak
              </h3>
              <p className="text-gray-700">{news.source}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id;

    if (!id || Array.isArray(id)) {
      return {
        props: {
          news: null,
          relatedNews: [],
          error: "Geçersiz haber ID",
        },
      };
    }

    // Haberi getir
    const newsResponse = await newsService.getNewsById(
      parseInt(id as string, 10)
    );

    if (!newsResponse.success || !newsResponse.data) {
      return {
        props: {
          news: null,
          relatedNews: [],
          error: newsResponse.message || "Haber bulunamadı",
        },
      };
    }

    const news = newsResponse.data;

    // İlgili haberleri getir (aynı kategorideki diğer haberler)
    const relatedNewsResponse = await newsService.getNewsByCategory(
      news.category || "",
      { limit: 5 }
    );

    // İlgili haberlerden mevcut haberi çıkar
    const relatedNews =
      relatedNewsResponse.success && relatedNewsResponse.data
        ? relatedNewsResponse.data
            .filter((item) => item.id !== news.id)
            .slice(0, 4)
        : [];

    return {
      props: {
        news,
        relatedNews,
      },
    };
  } catch (error) {
    console.error("Haber detay veri getirme hatası:", error);
    return {
      props: {
        news: null,
        relatedNews: [],
        error: "Haber yüklenirken bir hata oluştu",
      },
    };
  }
};
