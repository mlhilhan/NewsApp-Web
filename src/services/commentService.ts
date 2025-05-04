import apiClient from "./apiClient";
import { ApiResponse, Comment, Reaction, ReactionType } from "@/src/types";

const commentService = {
  /**
   * Belirli bir habere ait yorumları getir
   * @param newsId Haber ID
   * @param page Sayfa numarası
   * @param limit Sayfa başına yorum sayısı
   */
  async getCommentsByNewsId(
    newsId: number,
    page = 1,
    limit = 10
  ): Promise<ApiResponse<Comment[]>> {
    try {
      const response = await apiClient.get<ApiResponse<Comment[]>>(
        `/comments/news/${newsId}`,
        {
          params: { page, limit },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Yorumlar alınırken bir hata oluştu",
      };
    }
  },

  /**
   * Yeni yorum oluştur
   * @param content Yorum içeriği
   * @param newsId Haber ID
   */
  async createComment(
    content: string,
    newsId: number
  ): Promise<ApiResponse<Comment>> {
    try {
      const response = await apiClient.post<ApiResponse<Comment>>("/comments", {
        content,
        newsId,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Yorum oluşturulurken bir hata oluştu",
      };
    }
  },

  /**
   * Yorumu güncelle
   * @param id Yorum ID
   * @param content Yeni yorum içeriği
   */
  async updateComment(
    id: number,
    content: string
  ): Promise<ApiResponse<Comment>> {
    try {
      const response = await apiClient.put<ApiResponse<Comment>>(
        `/comments/${id}`,
        {
          content,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Yorum güncellenirken bir hata oluştu",
      };
    }
  },

  /**
   * Yorumu sil
   * @param id Yorum ID
   */
  async deleteComment(id: number): Promise<ApiResponse<null>> {
    try {
      const response = await apiClient.delete<ApiResponse<null>>(
        `/comments/${id}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Yorum silinirken bir hata oluştu",
      };
    }
  },

  /**
   * Belirli bir habere ait reaksiyonları getir
   * @param newsId Haber ID
   */
  async getReactionsByNewsId(
    newsId: number
  ): Promise<ApiResponse<{ type: ReactionType; count: number }[]>> {
    try {
      const response = await apiClient.get<
        ApiResponse<{ type: ReactionType; count: number }[]>
      >(`/reactions/news/${newsId}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Reaksiyonlar alınırken bir hata oluştu",
      };
    }
  },

  /**
   * Kullanıcının bir habere yaptığı reaksiyonu getir
   * @param newsId Haber ID
   */
  async getUserReactionByNewsId(
    newsId: number
  ): Promise<ApiResponse<Reaction | null>> {
    try {
      const response = await apiClient.get<ApiResponse<Reaction | null>>(
        `/reactions/user/news/${newsId}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message:
          error.message || "Kullanıcı reaksiyonu alınırken bir hata oluştu",
      };
    }
  },

  /**
   * Habere reaksiyon ekle veya güncelle
   * @param newsId Haber ID
   * @param type Reaksiyon tipi
   */
  async addOrUpdateReaction(
    newsId: number,
    type: ReactionType
  ): Promise<ApiResponse<Reaction | null>> {
    try {
      const response = await apiClient.post<ApiResponse<Reaction | null>>(
        "/reactions",
        {
          newsId,
          type,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Reaksiyon eklenirken bir hata oluştu",
      };
    }
  },

  /**
   * Habere yapılan reaksiyonu kaldır
   * @param newsId Haber ID
   */
  async removeReaction(newsId: number): Promise<ApiResponse<null>> {
    try {
      const response = await apiClient.delete<ApiResponse<null>>(
        `/reactions/news/${newsId}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: error.message || "Reaksiyon kaldırılırken bir hata oluştu",
      };
    }
  },
};

export default commentService;
