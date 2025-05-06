import { GetServerSideProps } from "next";
import Head from "next/head";
import NewsList from "../../src/components/news/NewsList";
import PageHeader from "../../src/components/ui/PageHeader";
import Pagination from "../../src/components/ui/Pagination";
import { News } from "../../src/types";
import newsService from "../../src/services/newsService";
import { useState } from "react";
import SectionTitle from "../../src/components/ui/SectionTitle";

interface BreakingNewsProps {
  news: News[];
  totalPages: number;
  currentPage: number;
  error?: string;
}

export default function BreakingNews({
  news,
  totalPages,
  currentPage,
  error,
}: BreakingNewsProps) {
  const [selectedLayout, setSelectedLayout] = useState<"grid" | "list">("list");

  return (
    <>
      <Head>
        <title>Son Dakika Haberleri | Tek Haber</title>
        <meta
          name="description"
          content="En güncel son dakika haberleri ve gelişmeleri Tek Haber'de"
        />
      </Head>

      <div className="space-y-8">
        <PageHeader
          title="Son Dakika Haberleri"
          description="En güncel ve önemli haberleri anlık olarak takip edin"
          selectedLayout={selectedLayout}
          onLayoutChange={setSelectedLayout}
        />

        <SectionTitle
          title="Son Gelişmeler"
          icon="clock"
          description="En yeni haberler burada"
        />

        <NewsList
          news={news}
          error={error}
          emptyMessage="Gösterilecek son dakika haberi bulunamadı."
          layout={selectedLayout}
          perRow={3}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/breaking-news"
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const page = query.page ? parseInt(query.page as string) : 1;
    const limit = 12; // Sayfa başına haber sayısı

    // Son dakika kategorisindeki haberleri getir
    const response = await newsService.getNewsByCategory("breaking-news", {
      page,
      limit,
      sort: "publishedAt",
      order: "DESC", // Yeniden eskiye doğru sırala
    });

    if (!response.success) {
      throw new Error(
        response.message || "Veriler yüklenirken bir hata oluştu"
      );
    }

    // Toplam sayfa sayısını hesapla
    const totalPages = response.pagination?.pages || 1;

    return {
      props: {
        news: response.data || [],
        totalPages,
        currentPage: page,
        error: null,
      },
    };
  } catch (error) {
    console.error("Son dakika sayfası veri getirme hatası:", error);
    return {
      props: {
        news: [],
        totalPages: 1,
        currentPage: 1,
        error: "Son dakika haberleri yüklenirken bir hata oluştu",
      },
    };
  }
};
