import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { News, ReactionType } from "@/src/types";
import { useAuth } from "@/src/contexts/AuthContext";
import CommentSection from "../comments/CommentSection";
import ReactionButtons from "../comments/ReactionButtons";
import { FiClock, FiUser, FiTag, FiLink } from "react-icons/fi";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import relativeTime from "dayjs/plugin/relativeTime";

// dayjs yapılandırması
dayjs.extend(relativeTime);
dayjs.locale("tr");

interface NewsDetailProps {
  news: News;
  loading?: boolean;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news, loading = false }) => {
  const { isAuthenticated } = useAuth();
  const [showShareOptions, setShowShareOptions] = useState(false);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const {
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

  const handleShare = async () => {
    setShowShareOptions(true);

    // Tarayıcı paylaşım API'si mevcut mu kontrol et
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `${title} - Haber Uygulaması`,
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
        alert("Bağlantı kopyalandı!");
        setShowShareOptions(false);
      },
      (err) => {
        console.error("Kopyalama hatası:", err);
      }
    );
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Haber Başlığı ve Meta Bilgiler */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6 gap-y-2">
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
                className="hover:text-blue-600"
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
        <div className="relative w-full h-80 sm:h-96 md:h-[500px]">
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
        <div className="prose max-w-none mb-8">
          {content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
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
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Paylaşım ve Reaksiyon Düğmeleri */}
        <div className="flex flex-wrap justify-between items-center border-t border-b border-gray-200 py-4 my-6">
          {/* Reaksiyon Düğmeleri */}
          <ReactionButtons newsId={news.id} />

          {/* Paylaşım Düğmesi */}
          <div className="relative">
            <button
              onClick={handleShare}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Paylaş
            </button>

            {showShareOptions && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          shareUrl
                        )}&text=${encodeURIComponent(title)}`,
                        "_blank"
                      )
                    }
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
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
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
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
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    WhatsApp'ta Paylaş
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Bağlantıyı Kopyala
                  </button>
                  <button
                    onClick={() => setShowShareOptions(false)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    İptal
                  </button>
                </div>
              </div>
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
