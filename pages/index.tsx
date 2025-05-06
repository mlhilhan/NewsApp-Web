import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { News, Category } from "@/src/types";
import newsService from "@/src/services/newsService";
import {
  FiClock,
  FiTrendingUp,
  FiMessageSquare,
  FiThumbsUp,
  FiStar,
} from "react-icons/fi";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import relativeTime from "dayjs/plugin/relativeTime";

// dayjs yapılandırması
dayjs.extend(relativeTime);
dayjs.locale("tr");

interface HomeProps {
  featuredNews: News[];
  latestNews: News[];
  popularNews: News[];
  categories: Category[];
  error?: string;
}

export default function Home({
  featuredNews,
  latestNews,
  popularNews,
  categories,
  error,
}: HomeProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Tarihi formatla
  const formatDate = (dateString: string) => {
    return dayjs(dateString).fromNow();
  };

  // Haberi kısalt
  const truncateContent = (text: string, maxLength: number) => {
    if (!text || text.length <= maxLength) return text || "";
    return text.slice(0, maxLength) + "...";
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-10 rounded-xl text-center my-8">
        <h2 className="text-xl font-semibold mb-2">Bir hata oluştu</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Tek Haber | Güncel Haberlerin Adresi</title>
        <meta
          name="description"
          content="En güncel haberler, son dakika gelişmeleri ve daha fazlası Tek Haber'de"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 space-y-12">
        {/* Hero Bölümü - Öne Çıkan Haber */}
        {featuredNews.length > 0 && (
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Ana Öne Çıkan Haber */}
              <div className="lg:col-span-2">
                <Link href={`/news/${featuredNews[0].id}`}>
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-lg group">
                    {featuredNews[0].imageUrl && (
                      <Image
                        src={featuredNews[0].imageUrl}
                        alt={featuredNews[0].title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 66vw"
                        priority
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>

                    {featuredNews[0].category && (
                      <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {featuredNews[0].category}
                      </span>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h1 className="text-3xl font-bold mb-3 leading-tight">
                        {featuredNews[0].title}
                      </h1>
                      <p className="text-gray-200 mb-4 line-clamp-2">
                        {truncateContent(featuredNews[0].content, 150)}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-300">
                        <div className="flex items-center gap-4">
                          {featuredNews[0].author && (
                            <span>{featuredNews[0].author}</span>
                          )}
                          <span className="flex items-center">
                            <FiClock className="mr-1" />
                            {formatDate(featuredNews[0].publishedAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center">
                            <FiMessageSquare className="mr-1" />
                            {featuredNews[0].comments?.length || 0}
                          </span>
                          <span className="flex items-center">
                            <FiThumbsUp className="mr-1" />
                            {featuredNews[0].reactions?.find(
                              (r) => r.type === "like"
                            )?.count || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Diğer Öne Çıkan Haberler */}
              <div className="flex flex-col gap-6">
                {featuredNews.slice(1, 3).map((news) => (
                  <Link key={news.id} href={`/news/${news.id}`}>
                    <div className="h-[calc(12rem)] relative rounded-xl overflow-hidden shadow-lg group">
                      {news.imageUrl && (
                        <Image
                          src={news.imageUrl}
                          alt={news.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>

                      {news.category && (
                        <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
                          {news.category}
                        </span>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h2 className="text-xl font-bold mb-2 line-clamp-2">
                          {news.title}
                        </h2>
                        <div className="flex justify-between items-center text-xs text-gray-300">
                          <span className="flex items-center">
                            <FiClock className="mr-1" />
                            {formatDate(news.publishedAt)}
                          </span>
                          <span className="flex items-center">
                            <FiMessageSquare className="mr-1" />
                            {news.comments?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Son Haberler Bölümü */}
        {latestNews.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FiClock className="text-blue-600" />
                <span>Son Haberler</span>
              </h2>
              <Link
                href="/latest"
                className="text-blue-600 hover:text-blue-800 font-medium transition flex items-center"
              >
                Tümünü Gör
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.slice(0, 6).map((news) => (
                <Link key={news.id} href={`/news/${news.id}`}>
                  <div className="h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 group">
                    <div className="relative h-48 overflow-hidden">
                      {news.imageUrl ? (
                        <Image
                          src={news.imageUrl}
                          alt={news.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                          <FiStar className="text-gray-400 text-4xl" />
                        </div>
                      )}
                      {news.category && (
                        <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
                          {news.category}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {truncateContent(news.content, 120)}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <FiClock className="mr-1" />
                          <span>{formatDate(news.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center">
                            <FiMessageSquare className="mr-1" />
                            {news.comments?.length || 0}
                          </span>
                          <span className="flex items-center">
                            <FiThumbsUp className="mr-1" />
                            {news.reactions?.find((r) => r.type === "like")
                              ?.count || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Popüler Haberler Bölümü */}
        {popularNews.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FiTrendingUp className="text-blue-600" />
                <span>Popüler Haberler</span>
              </h2>
              <Link
                href="/popular"
                className="text-blue-600 hover:text-blue-800 font-medium transition flex items-center"
              >
                Tümünü Gör
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularNews.slice(0, 8).map((news) => (
                <Link key={news.id} href={`/news/${news.id}`}>
                  <div className="h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group border border-gray-100 dark:border-gray-700">
                    <div className="relative h-40 overflow-hidden">
                      {news.imageUrl ? (
                        <Image
                          src={news.imageUrl}
                          alt={news.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                          <FiStar className="text-gray-400 text-4xl" />
                        </div>
                      )}
                      {news.category && (
                        <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
                          {news.category}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                        {news.title}
                      </h3>
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <FiClock className="mr-1" />
                          {formatDate(news.publishedAt)}
                        </span>
                        <span className="flex items-center">
                          <FiThumbsUp className="mr-1" />
                          {news.reactions?.find((r) => r.type === "like")
                            ?.count || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Kategoriler Bölümü */}
        {categories.length > 0 && (
          <section className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Kategoriler</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Öne çıkan haberleri getir
    const featuredResponse = await newsService.getAllNews({
      limit: 3,
      sort: "publishedAt",
      order: "DESC",
    });

    // Son haberleri getir
    const latestResponse = await newsService.getAllNews({
      limit: 6,
      sort: "publishedAt",
      order: "DESC",
    });

    // Popüler haberleri getir
    const popularResponse = await newsService.getAllNews({
      limit: 8,
      sort: "publishedAt",
      order: "DESC",
    });

    // Kategorileri getir
    const categoriesResponse = await newsService.getAllCategories();

    return {
      props: {
        featuredNews: featuredResponse.success
          ? featuredResponse.data || []
          : [],
        latestNews: latestResponse.success ? latestResponse.data || [] : [],
        popularNews: popularResponse.success ? popularResponse.data || [] : [],
        categories: categoriesResponse.success
          ? categoriesResponse.data || []
          : [],
        error:
          !featuredResponse.success ||
          !latestResponse.success ||
          !popularResponse.success ||
          !categoriesResponse.success
            ? "Haberler yüklenirken bir hata oluştu"
            : null,
      },
    };
  } catch (error) {
    console.error("Ana sayfa veri getirme hatası:", error);
    return {
      props: {
        featuredNews: [],
        latestNews: [],
        popularNews: [],
        categories: [],
        error: "Haberler yüklenirken bir hata oluştu",
      },
    };
  }
};
