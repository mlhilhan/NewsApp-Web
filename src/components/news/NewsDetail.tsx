// src/components/news/NewsDetail.tsx
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { News, ReactionType } from "@/src/types";
import { useAuth } from "@/src/contexts/AuthContext";
import CommentSection from "../comments/CommentSection";
import ReactionButtons from "../comments/ReactionButtons";
import {
  FiClock,
  FiUser,
  FiTag,
  FiLink,
  FiShare2,
  FiBookmark,
  FiTwitter,
  FiFacebook,
  FiLink2,
  FiCheck,
  FiX,
} from "react-icons/fi";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import relativeTime from "dayjs/plugin/relativeTime";

// dayjs yapılandırması
dayjs.extend(relativeTime);
dayjs.locale("tr");

interface NewsDetailProps {
  news: News;
  loading?: boolean;
  isSaved?: boolean;
  onSaveToggle?: (id: number) => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({
  news,
  loading = false,
  isSaved = false,
  onSaveToggle,
}) => {
  const { isAuthenticated, user } = useAuth();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  if (loading) {
    return (
      <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 mb-6"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const {
    id,
    title,
    content,
    imageUrl,
    author,
    source,
    category,
    publishedAt,
    categories,
  } = news;

  const formattedDate = publishedAt
    ? dayjs(publishedAt).format("DD MMMM YYYY, HH:mm")
    : "";

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleSave = () => {
    if (onSaveToggle) {
      onSaveToggle(id);
    }
  };

  const handleShare = async () => {
    setShowShareOptions(true);

    // Tarayıcı paylaşım API'si mevcut mu kontrol et
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `${title} - Tek Haber`,
          url: shareUrl,
        });
        // Kullanıcı paylaşım işlemini tamamladı
      } catch (error) {
        // Kullanıcı paylaşım işlemini iptal etti
        console.error("Paylaşım hatası:", error);
      }
    }
    // Paylaşım API'si yoksa, paylaşım seçeneklerini göster
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 3000);
        setShowShareOptions(false);
      },
      (err) => {
        console.error("Kopyalama hatası:", err);
      }
    );
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      {/* Haber Başlığı ve Meta Bilgiler */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
          {title}
        </h1>

        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6 gap-y-2">
          {author && (
            <div className="flex items-center mr-4">
              <FiUser className="mr-1" />
              <span>{author}</span>
            </div>
          )}

          {formattedDate && (
            <div className="flex items-center mr-4">
              <FiClock className="mr-1" />
              <span>{formattedDate}</span>
            </div>
          )}

          {category && (
            <div className="flex items-center mr-4">
              <FiTag className="mr-1" />
              <Link
                href={`/category/${category.toLowerCase()}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {category}
              </Link>
            </div>
          )}

          {source && (
            <div className="flex items-center">
              <FiLink className="mr-1" />
              <span>Kaynak: {source}</span>
            </div>
          )}
        </div>
      </div>

      {/* Haber Görseli */}
      {imageUrl && (
        <div className="relative aspect-video md:aspect-[21/9] w-full max-h-[600px]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Haber İçeriği */}
      <div className="p-6">
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          {content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Kategori Etiketleri */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Paylaşım ve Reaksiyon Düğmeleri */}
        <div className="flex flex-wrap justify-between items-center border-t border-b border-gray-200 dark:border-gray-700 py-4 my-6">
          {/* Reaksiyon Düğmeleri */}
          <ReactionButtons newsId={news.id} />

          {/* Paylaşım ve Kaydetme Düğmeleri */}
          <div className="flex space-x-2">
            {/* Paylaşım Düğmesi */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="flex items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                <FiShare2 className="mr-2" />
                Paylaş
              </button>

              {showShareOptions && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 py-2 border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          shareUrl
                        )}&text=${encodeURIComponent(title)}`,
                        "_blank"
                      )
                    }
                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <FiTwitter className="mr-3 text-blue-400" size={18} />
                    Twitter'da Paylaş
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          shareUrl
                        )}`,
                        "_blank"
                      )
                    }
                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <FiFacebook className="mr-3 text-blue-600" size={18} />
                    Facebook'ta Paylaş
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/?text=${encodeURIComponent(
                          title + " " + shareUrl
                        )}`,
                        "_blank"
                      )
                    }
                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <svg
                      className="mr-3 text-green-500 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp'ta Paylaş
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {linkCopied ? (
                      <>
                        <FiCheck className="mr-3 text-green-500" size={18} />
                        Kopyalandı!
                      </>
                    ) : (
                      <>
                        <FiLink2 className="mr-3 text-gray-500" size={18} />
                        Bağlantıyı Kopyala
                      </>
                    )}
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button
                    onClick={() => setShowShareOptions(false)}
                    className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    <FiX className="mr-3 text-gray-500" size={18} />
                    Kapat
                  </button>
                </div>
              )}
            </div>

            {/* Kaydet Düğmesi */}
            {isAuthenticated && onSaveToggle && (
              <button
                onClick={handleSave}
                className={`flex items-center ${
                  isSaved
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                } px-4 py-2 rounded-lg text-sm font-medium transition`}
              >
                <FiBookmark className="mr-2" />
                {isSaved ? "Kaydedildi" : "Kaydet"}
              </button>
            )}
          </div>
        </div>

        {/* Yorumlar Bölümü */}
        <CommentSection newsId={news.id} />
      </div>
    </article>
  );
};

export default NewsDetail;
