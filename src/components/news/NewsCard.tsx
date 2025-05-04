import React from "react";
import Link from "next/link";
import Image from "next/image";
import { News } from "@/src/types";
import { FiClock, FiMessageSquare, FiThumbsUp, FiTag } from "react-icons/fi";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import relativeTime from "dayjs/plugin/relativeTime";

// dayjs yapılandırması
dayjs.extend(relativeTime);
dayjs.locale("tr");

interface NewsCardProps {
  news: News;
  variant?: "default" | "compact" | "featured";
}

const NewsCard: React.FC<NewsCardProps> = ({ news, variant = "default" }) => {
  const {
    id,
    title,
    content,
    imageUrl,
    author,
    publishedAt,
    category,
    categories,
    comments,
    reactions,
  } = news;

  // Yorumların toplam sayısını hesapla
  const commentCount = comments?.length || 0;

  // Beğenilerin toplam sayısını hesapla
  const likeCount = reactions?.find((r) => r.type === "like")?.count || 0;

  // İçeriği kısaltma fonksiyonu
  const truncateContent = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Yayınlanma tarihini formatla
  const formattedDate = publishedAt ? dayjs(publishedAt).fromNow() : "";

  // Kompakt kart (sidebar için)
  if (variant === "compact") {
    return (
      <div className="flex items-start space-x-2 mb-3 pb-3 border-b border-gray-200">
        {imageUrl && (
          <Link href={`/news/${id}`} className="flex-shrink-0">
            <div className="relative w-16 h-16 rounded overflow-hidden">
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          </Link>
        )}

        <div className="flex-1 min-w-0">
          <Link href={`/news/${id}`} className="block">
            <h3 className="text-sm font-medium text-gray-800 hover:text-blue-600 line-clamp-2">
              {title}
            </h3>
          </Link>
          <div className="mt-1 text-xs text-gray-500 flex items-center">
            <FiClock className="mr-1" size={12} />
            {formattedDate}
          </div>
        </div>
      </div>
    );
  }

  // Öne çıkan haber kartı (ana sayfada büyük kart)
  if (variant === "featured") {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {imageUrl && (
          <Link href={`/news/${id}`} className="block">
            <div className="relative w-full h-64 sm:h-80 md:h-96">
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 60vw"
                className="object-cover"
              />
              {category && (
                <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {category}
                </span>
              )}
            </div>
          </Link>
        )}

        <div className="p-5">
          <Link href={`/news/${id}`} className="block">
            <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 mb-3">
              {title}
            </h2>
          </Link>

          <p className="text-gray-600 mb-4">{truncateContent(content, 200)}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              {author && <span className="mr-4">{author}</span>}
              <span className="flex items-center">
                <FiClock className="mr-1" />
                {formattedDate}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <FiMessageSquare className="mr-1" />
                {commentCount}
              </span>

              <span className="flex items-center">
                <FiThumbsUp className="mr-1" />
                {likeCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Varsayılan haber kartı
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {imageUrl && (
        <Link href={`/news/${id}`} className="block">
          <div className="relative w-full h-48">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
            {category && (
              <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                {category}
              </span>
            )}
          </div>
        </Link>
      )}

      <div className="p-4 flex-1 flex flex-col">
        <Link href={`/news/${id}`} className="block flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-2 line-clamp-2">
            {title}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {truncateContent(content, 120)}
          </p>
        </Link>

        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
          <div className="flex items-center">
            <FiClock className="mr-1" />
            {formattedDate}
          </div>

          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <FiMessageSquare className="mr-1" />
              {commentCount}
            </span>

            <span className="flex items-center">
              <FiThumbsUp className="mr-1" />
              {likeCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
