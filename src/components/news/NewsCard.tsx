// src/components/news/NewsCard.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { News } from "@/src/types";
import {
  FiClock,
  FiMessageSquare,
  FiThumbsUp,
  FiTag,
  FiStar,
  FiBookmark,
} from "react-icons/fi";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatRelativeTime } from "@/src/utils/date";

// dayjs yapılandırması
dayjs.extend(relativeTime);
dayjs.locale("tr");

interface NewsCardProps {
  news: News;
  variant?: "default" | "compact" | "featured" | "horizontal";
  showSaveButton?: boolean;
  onSave?: (id: number) => void;
  isSaved?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  news,
  variant = "default",
  showSaveButton = false,
  onSave,
  isSaved = false,
}) => {
  const {
    id,
    title,
    content,
    imageUrl,
    author,
    publishedAt,
    category,
    comments,
    reactions,
  } = news;

  // Yorumların toplam sayısını hesapla
  const commentCount = comments?.length || 0;

  // Beğenilerin toplam sayısını hesapla
  const likeCount = reactions?.find((r) => r.type === "like")?.count || 0;

  // İçeriği kısaltma fonksiyonu
  const truncateContent = (text: string, maxLength: number) => {
    if (!text || text.length <= maxLength) return text || "";
    return text.slice(0, maxLength) + "...";
  };

  // Yayınlanma tarihini formatla
  //const formattedDate = publishedAt ? dayjs(publishedAt).fromNow() : "";
  const formattedDate = formatRelativeTime(publishedAt);

  // Kaydet işlemi
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSave) {
      onSave(id);
    }
  };

  // Kompakt kart (sidebar için)
  if (variant === "compact") {
    return (
      <Link href={`/news/${id}`} className="block group">
        <div className="flex items-start space-x-3 mb-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
          {imageUrl ? (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
              <FiStar className="text-gray-400 text-xl" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-800 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              {title}
            </h3>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <FiClock className="mr-1" size={12} />
              {formattedDate}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Öne çıkan haber kartı (ana sayfada büyük kart)
  if (variant === "featured") {
    return (
      <Link href={`/news/${id}`} className="block group">
        <div className="relative h-[calc(28rem)] rounded-xl overflow-hidden shadow-lg">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 66vw"
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800"></div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>

          {category && (
            <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
              {category}
            </span>
          )}

          {showSaveButton && (
            <button
              onClick={handleSave}
              className={`absolute top-4 right-4 p-2 rounded-full z-10 transition-colors ${
                isSaved
                  ? "bg-blue-600 text-white"
                  : "bg-white/80 text-gray-700 hover:bg-white"
              }`}
              aria-label={isSaved ? "Kaydedildi" : "Kaydet"}
            >
              <FiBookmark size={18} />
            </button>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
              {title}
            </h2>

            <p className="text-gray-200 mb-4 line-clamp-2 text-sm sm:text-base">
              {truncateContent(content, 180)}
            </p>

            <div className="flex justify-between items-center text-sm text-gray-300">
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
      </Link>
    );
  }

  // Yatay haber kartı
  if (variant === "horizontal") {
    return (
      <Link href={`/news/${id}`} className="block group">
        <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 h-full">
          <div className="md:w-1/3 relative h-48 md:h-auto">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <FiStar className="text-gray-400 text-4xl" />
              </div>
            )}
            {category && (
              <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
                {category}
              </span>
            )}
          </div>

          <div className="flex-1 p-5 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              {title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
              {truncateContent(content, 150)}
            </p>

            <div className="flex justify-between items-center mt-auto text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                {author && (
                  <span className="mr-4 hidden sm:inline">{author}</span>
                )}
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
      </Link>
    );
  }

  // Varsayılan haber kartı
  return (
    <Link href={`/news/${id}`} className="block h-full group">
      <div className="h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-100 dark:border-gray-700">
        <div className="relative aspect-video overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <FiStar className="text-gray-400 text-4xl" />
            </div>
          )}

          {category && (
            <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs">
              {category}
            </span>
          )}

          {showSaveButton && (
            <button
              onClick={handleSave}
              className={`absolute top-3 right-3 p-1.5 rounded-full transition-colors ${
                isSaved
                  ? "bg-blue-600 text-white"
                  : "bg-white/80 text-gray-700 hover:bg-white"
              }`}
              aria-label={isSaved ? "Kaydedildi" : "Kaydet"}
            >
              <FiBookmark size={16} />
            </button>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
            {title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
            {truncateContent(content, 120)}
          </p>

          <div className="flex justify-between items-center mt-auto text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <FiClock className="mr-1" size={12} />
              {formattedDate}
            </div>

            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <FiMessageSquare className="mr-1" size={12} />
                {commentCount}
              </span>

              <span className="flex items-center">
                <FiThumbsUp className="mr-1" size={12} />
                {likeCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
