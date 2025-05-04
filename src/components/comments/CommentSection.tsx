import React, { useState, useEffect } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import commentService from "@/src/services/commentService";
import { Comment } from "@/src/types";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { toast } from "react-toastify";
import { FiMessageSquare } from "react-icons/fi";

interface CommentSectionProps {
  newsId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ newsId }) => {
  const { isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Yorumları getir
  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await commentService.getCommentsByNewsId(newsId, page);

      if (response.success) {
        setComments(response.data || []);
        if (response.pagination) {
          setTotalPages(response.pagination.pages);
        }
      } else {
        setError(response.message || "Yorumlar yüklenirken bir hata oluştu");
      }
    } catch (error) {
      setError("Yorumlar yüklenirken bir hata oluştu");
      console.error("Yorumları getirme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde yorumları getir
  useEffect(() => {
    fetchComments();
  }, [newsId, page]);

  // Yorum ekle
  const handleAddComment = async (content: string) => {
    try {
      const response = await commentService.createComment(content, newsId);

      if (response.success && response.data) {
        setComments([response.data, ...comments]);
        toast.success("Yorumunuz eklendi");
      } else {
        toast.error(response.message || "Yorum eklenirken bir hata oluştu");
      }
    } catch (error) {
      toast.error("Yorum eklenirken bir hata oluştu");
      console.error("Yorum ekleme hatası:", error);
    }
  };

  // Yorum güncelle
  const handleUpdateComment = async (id: number, content: string) => {
    try {
      const response = await commentService.updateComment(id, content);

      if (response.success && response.data) {
        const updatedComments = comments.map((comment) =>
          comment.id === id ? response.data : comment
        );
        setComments(updatedComments);
        toast.success("Yorumunuz güncellendi");
      } else {
        toast.error(response.message || "Yorum güncellenirken bir hata oluştu");
      }
    } catch (error) {
      toast.error("Yorum güncellenirken bir hata oluştu");
      console.error("Yorum güncelleme hatası:", error);
    }
  };

  // Yorum sil
  const handleDeleteComment = async (id: number) => {
    try {
      const response = await commentService.deleteComment(id);

      if (response.success) {
        const filteredComments = comments.filter(
          (comment) => comment.id !== id
        );
        setComments(filteredComments);
        toast.success("Yorumunuz silindi");
      } else {
        toast.error(response.message || "Yorum silinirken bir hata oluştu");
      }
    } catch (error) {
      toast.error("Yorum silinirken bir hata oluştu");
      console.error("Yorum silme hatası:", error);
    }
  };

  // Sayfa değiştir
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <FiMessageSquare className="mr-2" />
        Yorumlar
      </h3>

      {/* Yorum Formu */}
      {isAuthenticated ? (
        <div className="mb-6">
          <CommentForm onSubmit={handleAddComment} />
        </div>
      ) : (
        <div className="bg-blue-50 text-blue-700 p-4 rounded-md mb-6">
          <p>
            Yorum yapabilmek için{" "}
            <a href="/auth/login" className="font-medium hover:underline">
              giriş yapmanız
            </a>{" "}
            gerekmektedir.
          </p>
        </div>
      )}

      {/* Yorumlar Listesi */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="bg-gray-50 text-gray-600 p-6 rounded-md text-center">
          <p>Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
          ))}

          {/* Sayfalama */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-l-md ${
                    page === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Önceki
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                        p === page
                          ? "bg-blue-50 text-blue-600 z-10"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-md ${
                    page === totalPages
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
      )}
    </div>
  );
};

export default CommentSection;
