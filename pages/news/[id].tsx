// pages/news/[id].tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { News } from "@/src/types";
import newsService from "@/src/services/newsService";
import NewsDetail from "@/src/components/news/NewsDetail";
import NewsSidebar from "@/src/components/news/NewsSidebar";
import NewsLoading from "@/src/components/news/NewsLoading";
import NewsErrorState from "@/src/components/news/NewsErrorState";

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

  // Sayfa henüz yüklenmediyse
  if (router.isFallback) {
    return <NewsLoading />;
  }

  // Hata durumu
  if (error || !news) {
    return <NewsErrorState message={error} />;
  }

  return (
    <>
      <Head>
        <title>{news.title} - Tek Haber</title>
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
        <NewsSidebar news={news} relatedNews={relatedNews} />
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
